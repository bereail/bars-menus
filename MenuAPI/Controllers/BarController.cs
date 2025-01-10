using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models.Dtos;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BarController : ControllerBase
    {
        private readonly IBarService _barServices;

        public BarController(IBarService barServices)
        {
            _barServices = barServices;
        }

        // Obtener una categoría por ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBarById(int id)
        {
            try
            {
                var bar = await _barServices.GetBarByIdAsync(id);
                return Ok(bar);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // Obtener todas las categorías
        [HttpGet]
        public async Task<IActionResult> GetAllBar()
        {
            var bars = await _barServices.GetAllBarAsync();
            return Ok(bars);
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateBar(int userId, [FromBody] BarDto barDto)
        {
            if (barDto == null)
                return BadRequest(new { message = "Datos del bar no son válidos." });

            try
            {
                var bar = await _barServices.CreateBarAsync(barDto, userId);
                // Devolver el DTO simplificado
                return CreatedAtAction(nameof(GetBarById), new { id = bar.Id }, bar);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }


    }

}
