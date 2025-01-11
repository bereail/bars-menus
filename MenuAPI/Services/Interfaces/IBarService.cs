using WebApplication1.Models.Dtos;
using WebApplication1.Models;
using WebApplication1.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Services.Interfaces
{
    public interface IBarService
    {

        Task<List<BarWithMenuDto>> GetAllBarWithMenusAsync();

        Task<BarWithMenuDto> GetAllBarWithMenusByIdAsync(int id);

        Task<Bar> GetBarByIdAsync(int id);
            Task<List<BarDto>> GetAllBarAsync();
        Task<SimpleBarDto> CreateBarAsync(BarDto barDto, int userId);
        Task<Bar> UpdateBaryAsync(int id, BarDto barDto);
            Task<Bar> EditBarAsync(int id, BarDto barDto);
            Task DeleteBarAsync(int id);
        

    }
}
