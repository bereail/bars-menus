using System.Threading.Tasks;
using WebApplication1.Models.Dtos;

namespace WebApplication1.Services.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllProductAsync();
        Task<ProductDto> GetProductByIdAsync(int id);
        Task<ProductDto> CreateProductAsync(ProductDto productDto);
        Task<ProductDto> UpdateProductAsync(int id, ProductDto productDto);
        Task<bool> DeleteProductAsync(int id);
    }
}

