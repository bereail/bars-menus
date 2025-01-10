using WebApplication1.Models;
using WebApplication1.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models.Dtos;


namespace WebApplication1.Services
{
    public class ProductService : IProductService
    {
        private readonly RositaMenuDBContext _context;

        public ProductService(RositaMenuDBContext context)
        {
            _context = context;
        }

        // Obtener todos los productos
        public async Task<List<ProductDto>> GetAllProductAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Select(p => new ProductDto
                {
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    MenuId = p.MenuId
                })
                .ToListAsync();
        }


        // Método para obtener un producto por id usando un DTO
        public async Task<ProductDto> GetProductByIdAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return null; // Producto no encontrado
            }

            return new ProductDto
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId,
                MenuId = product.MenuId
            };
        }

        // Método para crear un producto usando un DTO
        public async Task<ProductDto> CreateProductAsync(ProductDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                CategoryId = productDto.CategoryId,
                MenuId = productDto.MenuId
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return productDto;
        }

        // Método para actualizar un producto usando un DTO
        public async Task<ProductDto> UpdateProductAsync(int id, ProductDto productDto)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return null; // Producto no encontrado
            }

            existingProduct.Name = productDto.Name;
            existingProduct.Description = productDto.Description;
            existingProduct.Price = productDto.Price;
            existingProduct.CategoryId = productDto.CategoryId;
            existingProduct.MenuId = productDto.CategoryId;

            await _context.SaveChangesAsync();

            return productDto;
        }

        // Método para eliminar un producto usando un DTO
        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return false; // Producto no encontrado
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}