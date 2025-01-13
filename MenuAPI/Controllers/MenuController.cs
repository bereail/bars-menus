using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models.Dtos;
using WebApplication1.Models.Dtos.Credentials;
using WebApplication1.Services;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuServices;

        // Inyección de dependencias para el servicio
        public MenuController(IMenuService menuServices)
        {
            _menuServices = menuServices;
        }




        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetMenuDetails(int id)
        {
            try
            {
               
                var menu = await _menuServices.GetMenuWithDetailsByIdAsync(id);

                if (menu == null)
                {
                    return NotFound(new { message = "Menu not found" });
                }

                
                var menuDetails = new
                {
                    MenuId = menu.Id,
                    MenuName = menu.Name,
                    Products = menu.Products.Select(product => new
                    {
                        ProductId = product.Id,
                        ProductName = product.Name,
                        ProductPrice = product.Price,
                        ProductDescription = product.Description,
                        Category = new
                        {
                            CategoryId = product.Category.Id,
                            CategoryName = product.Category.Name,
                            Section = new
                            {
                                SectionId = product.Category.Section.Id,
                                SectionName = product.Category.Section.Name
                            }
                        }
                    })
                };

                return Ok(menuDetails);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    

    // Obtener un menu por ID
    [HttpGet("menu-get/{id}")]
        public async Task<IActionResult> GetMenuById(int id)
        {
            try
            {
                var bar = await _menuServices.GetMenuByIdAsync(id);
                return Ok(bar);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // Obtener todas las categorías
        [HttpGet]
        public async Task<IActionResult> GetAllMenu()
        {
            var menus = await _menuServices.GetAllMenuAsync();
            return Ok(menus);
        }

        [HttpPost("{barId}")]
        public async Task<IActionResult> CreateMenu(int barId, [FromBody] MenuDto menuDto)
        {
            if (menuDto == null)
                return BadRequest(new { message = "Datos del menu no son válidos." });

            try
            {
                var bar = await _menuServices.CreateMenuAsync(menuDto, barId);
                // Devolver el DTO simplificado
                return CreatedAtAction(nameof(GetMenuById), new { id = bar.Id }, bar);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }


    }
}