using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models.Dtos;
using WebApplication1.Services;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = (CategoryService?)categoryService;
        }

        // Crear una nueva categoría asociada a una sección
        [HttpPost("{sectionId}")]
        public async Task<IActionResult> CreateCategory(int sectionId, [FromBody] CategoryDto categoryDto)
        {
            if (categoryDto == null)
                return BadRequest(new { message = "Datos de la categoría no son válidos." });

            try
            {
                var category = await _categoryService.CreateCategoryAsync(categoryDto, sectionId);
                return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // Obtener una categoría por ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                var category = await _categoryService.GetCategoryByIdAsync(id);
                return Ok(category);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // Obtener todas las categorías
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoryAsync();
            return Ok(categories);
        }

        // Actualizar una categoría
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryDto categoryDto)
        {
            if (categoryDto == null)
                return BadRequest(new { message = "Datos de la categoría no son válidos." });

            try
            {
                var updatedCategory = await _categoryService.UpdateCategoryAsync(id, categoryDto);
                return Ok(updatedCategory);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // Eliminar una categoría
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                await _categoryService.DeleteCategoryAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}