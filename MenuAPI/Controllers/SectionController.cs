using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models.Dtos;
using WebApplication1.Services;
using WebApplication1.Services.Interfaces;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SectionController : ControllerBase
    {
        private readonly ISectionService _sectionService;

        public SectionController(ISectionService sectionService)
        {
            _sectionService = sectionService;
        }

        // Obtener todas las secciones
        [HttpGet]
        public async Task<IActionResult> GetAllSections()
        {
            var sections = await _sectionService.GetAllSectionAsync();
            return Ok(sections);
        }

        // Obtener una sección por id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSectionById(int id)
        {
            try
            {
                var section = await _sectionService.GetSectionByIdAsync(id);
                return Ok(section);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Sección no encontrada." });
            }
        }

        // Crear una nueva sección
        [HttpPost]
        public async Task<IActionResult> CreateSection([FromBody] SectionDto sectionDto)
        {
            if (sectionDto == null)
                return BadRequest(new { message = "Los datos de la sección no son válidos." });

            try
            {
                var createdSection = await _sectionService.CreateSectionAsync(sectionDto);
                return CreatedAtAction(nameof(GetSectionById), new { id = createdSection.Id }, createdSection);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error al crear la sección: {ex.Message}" });
            }
        }


        // Actualizar una sección
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSection(int id, [FromBody] SectionDto sectionDto)
        {
            if (sectionDto == null)
                return BadRequest(new { message = "Los datos de la sección no son válidos." });

            try
            {
                var updatedSection = await _sectionService.UpdateSectionAsync(id, sectionDto);
                return Ok(updatedSection);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Sección no encontrada." });
            }
        }

        // Eliminar una sección
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSection(int id)
        {
            try
            {
                await _sectionService.DeleteSectionAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Sección no encontrada." });
            }
        }
    }
}