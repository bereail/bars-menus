
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Models.Dtos;
using WebApplication1.Models.Entities;

namespace WebApplication1.Services.Interfaces
{
    public interface IMenuService
    {
        Task<Menu> GetMenuByIdAsync(int id);
        Task<List<MenuDto>> GetAllMenuAsync();

        Task<Menu> GetMenuWithDetailsByIdAsync(int id);
        Task<MenuDto> CreateMenuAsync(MenuDto menuDto, int barId);

    }
}
