using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models.Dtos;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDto loginDto)
        {
            if (loginDto == null || string.IsNullOrEmpty(loginDto.Username) || string.IsNullOrEmpty(loginDto.Pass))
            {
                return BadRequest("Username and password are required.");
            }

            var user = await _userService.AuthenticateAsync(loginDto.Username, loginDto.Pass);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            // Aquí puedes devolver el usuario autenticado o algún token JWT
            return Ok(new { Id = user.Id, Username = user.Username });
        }
    }
}
