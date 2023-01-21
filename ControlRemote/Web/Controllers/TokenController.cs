using Application;
using Application.Command;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Web.Dto;

namespace Web.Controllers
{
    [Route("api/token")]
    [ApiController]
    public class TokenController : Controller
    {
        private IUnitOfWork _unitOfWork;
        private IUserService _userService;
        private ITokenService _tokenService;
        public TokenController(IUnitOfWork unitOfWork, IUserService userService, ITokenService tokenService)
        {
            _unitOfWork = unitOfWork;
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenModel tokenModel)
        {
            try
            {
                if (tokenModel is null)
                    return BadRequest("Invalid client request");
                string accessToken = tokenModel.AccessToken;
                string refreshToken = tokenModel.RefreshToken;
                ClaimsPrincipal principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
                string userLogin = principal.Identity.Name;
                UserTokenCommand user = await _userService.GetUserTokenbByLogin(userLogin);
                if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                    return BadRequest("Invalid client request");
                string newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
                string newRefreshToken = _tokenService.GenerateRefreshToken();
                await _userService.RefreshUserToken(user.Id, newRefreshToken);
                await _unitOfWork.Commit();
                return Ok(new AuthenticatedResponse()
                {
                    Token = newAccessToken,
                    RefreshToken = newRefreshToken
                });
            }
            catch
            {
                return BadRequest("error");
            }
        }

        [Authorize]
        [HttpPost("revoke")]
        public async Task<IActionResult> Revoke()
        {
            var userLogin = User.Identity.Name;
            UserTokenCommand user = await _userService.GetUserTokenbByLogin(userLogin);
            if (user == null) 
                return BadRequest();
            await _userService.RefreshUserToken(user.Id, null);
            await _unitOfWork.Commit();
            return NoContent();
        }
    }
}
