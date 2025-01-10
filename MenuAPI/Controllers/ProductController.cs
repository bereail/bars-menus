using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models.Dtos;
using WebApplication1.Services.Interfaces;

namespace MenuRositaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

   // Obtener todos los productos
        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetAll()
        {
            var products = await _productService.GetAllProductAsync();
            return Ok(products); // Devuelve un código 200 con la lista de productos
        }

        // Obtener un producto por id
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound($"Producto con ID {id} no encontrado.");
            }

            return Ok(product);
        }

        // Crear un nuevo producto
        [HttpPost]
        public async Task<ActionResult<ProductDto>> Create([FromBody] ProductDto productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Devuelve un código 400 si la validación falla
            }

            var createdProduct = await _productService.CreateProductAsync(productDto);
            return CreatedAtAction(nameof(GetById), new { createdProduct });
        }

        // Actualizar un producto existente
        [HttpPut("{id}")]
        public async Task<ActionResult<ProductDto>> Update(int id, [FromBody] ProductDto productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedProduct = await _productService.UpdateProductAsync(id, productDto);
            if (updatedProduct == null)
            {
                return NotFound($"Producto con ID {id} no encontrado.");
            }

            return Ok(updatedProduct);
        }

        // Eliminar un producto
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _productService.DeleteProductAsync(id);
            if (!result)
            {
                return NotFound($"Producto con ID {id} no encontrado.");
            }

            return NoContent(); // Devuelve un código 204 si la eliminación fue exitosa
        }
    }
}