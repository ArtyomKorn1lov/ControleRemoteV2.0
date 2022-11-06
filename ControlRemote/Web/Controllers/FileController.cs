using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Web.Dto;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/file")]
    public class FileController : Controller
    {
        private IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [Authorize(Roles = "admin, manager")]
        [HttpPost]
        public async Task<IActionResult> GetFile(PathModel pathModel)
        {
            if (pathModel == null)
                return null;
            byte[] byteArray = await _fileService.ReadFile(pathModel.Path);
            if (byteArray == null)
                return BadRequest("error");
            string fileBase64 = Convert.ToBase64String(byteArray);
            return Ok(fileBase64);
        }
    }
}
