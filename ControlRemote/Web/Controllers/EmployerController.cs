using Application;
using Application.Services;
using Application.Command;
using Web.DtoConverter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Dto;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ControlRemote.Controllers
{
    [ApiController]
    [Route("api/employer")]
    public class EmployerController : Controller
    {
        private IUnitOfWork _unitOfWork;
        private IEmployerService _employerService;
        private IUserService _userService;

        public EmployerController(IUnitOfWork unitOfWork, IEmployerService employerService, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _employerService = employerService;
            _userService = userService;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("employer-list")]
        public async Task<List<EmployerModel>> GetEmployers()
        {
            List<EmployerTransferCommand> employersCommands = await _employerService.GetAll();
            List<EmployerModel> employersModels = employersCommands.Select(data => EmployerDtoConverter.EmployerTransferCommandConvertToEmployerModel(data)).ToList();
            if(employersModels == null)
            {
                return null;
            }
            return employersModels;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("by-id/{id}")]
        public async Task<EmployerModel> GetEmployerById(int id)
        {
            EmployerModel employer = EmployerDtoConverter.EmployerTransferCommandConvertToEmployerModel(await _employerService.GetById(id));
            if(employer == null)
            {
                return null;
            }
            return employer;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("by-name/{name}/{id}")]
        public async Task<List<EmployerModel>> GetEmployersByName(string name, int id)
        {
            List<EmployerTransferCommand> employersCommands = await _employerService.GetByName(name, id);
            List<EmployerModel> employersModels = employersCommands.Select(data => EmployerDtoConverter.EmployerTransferCommandConvertToEmployerModel(data)).ToList();
            if (employersModels == null)
            {
                return null;
            }
            return employersModels;
        }

        [Authorize(Roles = "admin")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateEmployer(EmployerCreateModel employer)
        {
            try
            {
                if(await _employerService.Create(EmployerDtoConverter.EmployerCreateModelConvertToEmployerCreateCommand(employer)))
                {
                    await _unitOfWork.Commit();
                    return Ok("success");
                }
                return BadRequest("error");
            }
            catch
            {
                return BadRequest("error");
            }
        }

        [Authorize(Roles = "admin")]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateEmployer(EmployerModel employer)
        {
            try
            { 
                if(await _employerService.Update(EmployerDtoConverter.EmployerModelConvertToEmployerTransferCommand(employer)))
                {
                    await _unitOfWork.Commit();
                    return Ok("success");
                }
                return BadRequest("error");
            }
            catch
            {
                return BadRequest("error");
            }
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemoveEmployer(int id)
        {
            try
            {
                if(await _employerService.Delete(id))
                {
                    await _unitOfWork.Commit();
                    return Ok("success");
                }
                return BadRequest("error");
            }
            catch
            {
                return BadRequest("error");
            }
        }

        [Authorize(Roles = "admin")]
        [HttpGet("by-manager-id/{id}")]
        public async Task<List<EmployerModel>> GetEmployersByManagerId(int id)
        {
            List<EmployerTransferCommand> commands = await _employerService.GetByManagerId(id);
            List<EmployerModel> models = commands.Select(data => EmployerDtoConverter.EmployerTransferCommandConvertToEmployerModel(data)).ToList();
            if (models == null)
            {
                return null;
            }
            return models;
        }

        [Authorize(Roles = "admin, manager")]
        [HttpGet("by-user-login")]
        public async Task<List<string>> GetByUserLogin()
        {
            string role = User.FindFirstValue(ClaimsIdentity.DefaultRoleClaimType);
            if (role == null)
            {
                return null;
            }
            List<string> logins = new List<string>();
            if (role == "admin")
            {
                logins = await _employerService.GetAllLogins();
                return logins;
            }
            logins = await _userService.GetLoginsByUserLogin(User.Identity.Name);
            if(logins == null)
            {
                return null;
            }
            return logins;
        }
    }
}
