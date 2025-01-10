using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.Models.Dtos;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly RositaMenuDBContext _context;

        public CategoryService(RositaMenuDBContext context)
        {
            _context = context;
        }

        // Obtener una categoría por ID
        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Section) // Incluir la sección asociada si es necesario
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                throw new KeyNotFoundException("Categoría no encontrada.");
            }

            return category;
        }



        // Obtener todas las categorías
        public async Task<List<CategoryDto>> GetAllCategoryAsync()
        {
            var categories = await _context.Categories
                .Include(c => c.Section)
                .Select(c => new CategoryDto
                {
                    Name = c.Name,
                    SectionId = c.Section.Id // Supone que CategoryDto tiene SectionId
                })
                .ToListAsync();

            return categories;
        }

        // Crear una nueva categoría asociada a una sección
        public async Task<Category> CreateCategoryAsync(CategoryDto categoryDto, int sectionId)
        {
            // Validar que la sección existe
            var section = await _context.Sections.FindAsync(sectionId);
            if (section == null)
            {
                throw new KeyNotFoundException("La sección especificada no existe.");
            }

            // Convertir CategoryDto a Category y asociarla a la sección
            var category = new Category
            {
                Name = categoryDto.Name,
                SectionId = sectionId
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }



        // Actualizar una categoría
        public async Task<Category> UpdateCategoryAsync(int id, CategoryDto categoryDto)
        {
            // Buscar la categoría por ID
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                throw new KeyNotFoundException("Categoría no encontrada.");
            }

            // Validar si se especifica una nueva sección
            if (categoryDto.SectionId.HasValue && categoryDto.SectionId != category.SectionId)
            {
                var section = await _context.Sections.FindAsync(categoryDto.SectionId.Value);
                if (section == null)
                {
                    throw new KeyNotFoundException("La nueva sección especificada no existe.");
                }

                // Asignar la nueva sección si es válida
                category.SectionId = categoryDto.SectionId.Value;
            }

            // Actualizar el nombre de la categoría
            category.Name = categoryDto.Name;

            // Actualizar el registro en la base de datos
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();

            // Devolver la categoría actualizada
            return category;
        }


        public async Task DeleteCategoryAsync(int id)
        {
            // Buscar la sección por ID
            var section = await _context.Sections
                .Include(s => s.Categories) // Incluir las categorías asociadas
                .FirstOrDefaultAsync(s => s.Id == id);

            if (section == null)
            {
                throw new KeyNotFoundException("Sección no encontrada.");
            }

            // Verificar si hay categorías asociadas
            if (section.Categories.Any())
            {
                throw new InvalidOperationException("No se puede eliminar la sección porque tiene categorías asociadas.");
            }

            // Si no tiene categorías, proceder a eliminar
            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();
        }


    }
}