using Application;
using Application.Command;
using Application.Services;
using Domain.Entity;
using Infrastructure;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Web.Dto;
using Web.DtoConverter;
using Web;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Web.TokenService;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private IUnitOfWork _unitOfWork;
        private IConfiguration _configuration { get; }
        private IUserService _userService;
        private ITokenService _tokenService;

        public AccountController(IConfiguration configuration, IUnitOfWork unitOfWork, IUserService userService, ITokenService tokenService)
        {
            _configuration = configuration;
            _unitOfWork = unitOfWork;
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                if(model is null)
                    return Ok("error");
                if (model.Login == _configuration.GetConnectionString("AdminLogin") && model.Password == _configuration.GetConnectionString("AdminPassword"))
                {
                    int accountId = await _userService.GetUserIdByLogin(_configuration.GetConnectionString("AdminLogin"));
                    List<Claim> identity = GetIdentity(_configuration.GetConnectionString("AdminLogin"), "admin");
                    string accessToken = _tokenService.GenerateAccessToken(identity);
                    string refreshToken = _tokenService.GenerateRefreshToken();
                    await _userService.SetUserToken(accountId, refreshToken);
                    await _unitOfWork.Commit();
                    return Ok(new AuthenticatedResponse 
                    {
                        Token = accessToken,
                        RefreshToken = refreshToken
                    });
                }
                if (await _userService.GetLoginResult(model.Login, model.Password))
                {
                    int accountId = await _userService.GetUserIdByLogin(model.Login);
                    List<Claim> identity = GetIdentity(model.Login, "manager");
                    string accessToken = _tokenService.GenerateAccessToken(identity);
                    string refreshToken = _tokenService.GenerateRefreshToken();
                    await _userService.SetUserToken(accountId, refreshToken);
                    await _unitOfWork.Commit();
                    return Ok(new AuthenticatedResponse
                    {
                        Token = accessToken,
                        RefreshToken = refreshToken
                    }); 
                }
                return Ok("error");
            }
            catch
            {
                return BadRequest("error");
            }
        }

        private string CreateToken(List<Claim> identity)
        {
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            SigningCredentials signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: identity,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }

        private List<Claim> GetIdentity(string userName, string role)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, userName),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, role)
                };
            return claims;
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                if (IsUserAuthorized().Name == null)
                {
                    return Ok("error");
                }
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return Ok("success");
            }
            catch
            {
                return BadRequest("error");
            }
        }

        [HttpGet("is-authorized")]
        public AuthoriseModel IsUserAuthorized()
        {
            AuthoriseModel authorise = new AuthoriseModel(User.Identity.Name, User.FindFirstValue(ClaimsIdentity.DefaultRoleClaimType));
            return authorise;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("user-list")]
        public async Task<List<UserModel>> GetUsers()
        {
            List<UserTransferCommand> usersTransferCommand = await _userService.GetUsers();
            List<UserModel> user = usersTransferCommand.Select(data => UserDtoConverter.UserTransferCommandConvertToUserDto(data)).ToList();
            if (user == null)
            {
                return null;
            }
            return user;
        }

        [Authorize(Roles = "admin")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(UserCreateModel user)
        {
            try
            {
                if (user.Login == _configuration.GetConnectionString("AdminLogin"))
                {
                    return Ok("error");
                }
                if (await _userService.GetRegisterResult(user.Login))
                {
                    UserCreateCommand userCommand = UserDtoConverter.UserCreateModelConvertToUserCreateCommand(user);
                    if (await _userService.CreateUser(userCommand))
                    {
                        await _unitOfWork.Commit();
                        return Ok("success");
                    }
                    return Ok("error");
                }
                return Ok("error");
            }
            catch
            {
                return BadRequest("error");
            }
        }

        [Authorize(Roles = "admin")]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser(UserUpdateModel user)
        {
            try
            {
                if (user.Login == _configuration.GetConnectionString("AdminLogin"))
                {
                    return Ok("error");
                }
                UserModel getUser = UserDtoConverter.UserTransferCommandConvertToUserDto(await _userService.GetUserById(user.Id));
                if (getUser == null)
                {
                    return Ok("error");
                }
                if (!await _userService.GetRegisterResult(user.Login) && getUser.Login != user.Login)
                {
                    return Ok("error");
                }
                UserUpdateCommand userCommand = UserDtoConverter.UserUpdateModelConvertToUserUpdateCommand(user);
                if (await _userService.UpdateUser(userCommand))
                {
                    await _unitOfWork.Commit();
                    return Ok("success");
                }
                return Ok("error");
            }
            catch
            {
                return BadRequest("error");
            }
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemoveUser(int id)
        {
            try
            {
                if (await _userService.RemoveUser(id))
                {
                    await _unitOfWork.Commit();
                    return Ok("success");
                }
                return Ok("error");
            }
            catch
            {
                return BadRequest("error");
            }
        }

        [Authorize(Roles = "admin")]
        [HttpGet("by-id/{id}")]
        public async Task<UserModel> GetUserById(int id)
        {
            UserTransferCommand userCommand = await _userService.GetUserById(id);
            UserModel userDto = UserDtoConverter.UserTransferCommandConvertToUserDto(userCommand);
            if (userDto == null)
            {
                return null;
            }
            return userDto;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("by-name/{name}")]
        public async Task<List<UserModel>> GetUserByName(string name)
        {
            List<UserTransferCommand> userCommands = await _userService.GetUserByName(name);
            List<UserModel> usersDto = userCommands.Select(data => UserDtoConverter.UserTransferCommandConvertToUserDto(data)).ToList();
            if (usersDto == null)
            {
                return null;
            }
            return usersDto;
        }
    }
}
