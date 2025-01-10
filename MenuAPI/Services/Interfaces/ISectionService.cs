using WebApplication1.Models;
using WebApplication1.Models.Dtos;


namespace WebApplication1.Services.Interfaces
{
    public interface ISectionService
    {
        Task<Section> GetSectionByIdAsync(int id);

        Task<List<Models.Dtos.SectionDto>> GetAllSectionAsync();
        Task<Section> CreateSectionAsync(SectionDto sectionDto);

        Task<Section> UpdateSectionAsync(int id, SectionDto sectionDto);
        Task DeleteSectionAsync(int id);
    }
}

