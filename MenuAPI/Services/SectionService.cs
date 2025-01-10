using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.Models.Dtos;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Services
{
    public class SectionService : ISectionService
    {
        private readonly RositaMenuDBContext _context;

        public SectionService(RositaMenuDBContext context)
        {
            _context = context;
        }



        // Obtener un producto por id
        public async Task<Section> GetSectionByIdAsync(int id)
        {
            var section = await _context.Sections
                .Include(s => s.Categories)  // Incluye las categorías asociadas
                .FirstOrDefaultAsync(s => s.Id == id);

            if (section == null)
            {
                throw new Exception("Sección no encontrada.");
            }

            return section;
        }



        // Obtener todas las secciones
        public async Task<List<SectionDto>> GetAllSectionAsync()
        {
            var sections = await _context.Sections
                .Include(s => s.Categories)
                .Select(s => new SectionDto
                {
                    Name = s.Name,
                    Categories = s.Categories.Select(c => new CategoryDto
                    {
                        Name = c.Name,
                        SectionId = c.SectionId
                    }).ToList()
                })
                .ToListAsync();

            return sections;
        }




        // Crear una nueva sección
        public async Task<Section> CreateSectionAsync(SectionDto sectionDto)
        {
            if (sectionDto == null)
                throw new ArgumentNullException(nameof(sectionDto));

            // Convertir el DTO a una entidad
            var section = new Section
            {
                Name = sectionDto.Name
            };

            _context.Sections.Add(section);
            await _context.SaveChangesAsync();

            return section;
        }
    



        // Actualizar una sección
        public async Task<Section> UpdateSectionAsync(int id, SectionDto sectionDto)
        {
            var section = await _context.Sections.FindAsync(id);

            if (section == null)
            {
                throw new KeyNotFoundException("Sección no encontrada.");
            }

            section.Name = sectionDto.Name;

            _context.Sections.Update(section);
            await _context.SaveChangesAsync();

            return section;
        }

        // Eliminar una sección
        public async Task DeleteSectionAsync(int id)
        {
            var section = await _context.Sections.FindAsync(id);

            if (section == null)
            {
                throw new KeyNotFoundException("Sección no encontrada.");
            }

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();
        }

    }
}
