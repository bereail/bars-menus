using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.Models.Dtos;
using WebApplication1.Models.Entities;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Services
{
    public class BarService : IBarService
    {

        private readonly RositaMenuDBContext _context;

        public BarService(RositaMenuDBContext context)
        {
            _context = context;
        }

        public async Task<Bar> GetBarByIdAsync(int id)
        {
            var category = await _context.Bars
             .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                throw new KeyNotFoundException("Bar no encontrado.");
            }

            return category;
        }

        public async Task<List<BarDto>> GetAllBarAsync()
        {
            var bars = await _context.Bars
       .Include(c => c.User)
       .Select(c => new BarDto
       {
           Name = c.Name,
           UserId = c.User.Id // Supone que CategoryDto tiene SectionId
       })
       .ToListAsync();

            return bars;
        }
        public async Task<SimpleBarDto> CreateBarAsync(BarDto barDto, int userId)
        {
            var existingUser = await _context.Users.FindAsync(userId);
            if (existingUser == null)
            {
                throw new KeyNotFoundException("El usuario especificado no existe.");
            }

            var newBar = new Bar
            {
                Name = barDto.Name,
                UserId = userId,
            };

            _context.Bars.Add(newBar);
            await _context.SaveChangesAsync();

            // Proyectar al DTO simplificado
            return await _context.Bars
                .Where(b => b.Id == newBar.Id)
                .Select(b => new SimpleBarDto
                {
                    Id = b.Id,
                    Name = b.Name,
                    UserId = b.UserId
                })
                .FirstOrDefaultAsync();
        }



        public async Task<Bar> UpdateBaryAsync(int id, BarDto barDto)
        {
            var bar = await _context.Bars.FindAsync(id);

            if (bar == null)
            {
                throw new KeyNotFoundException("Bar no encontrado.");
            }

            // Actualizar el nombre de la barra
            bar.Name = barDto.Name;

            _context.Bars.Update(bar);
            await _context.SaveChangesAsync();

            return bar;
        }


        public async Task<Bar> EditBarAsync(int id, BarDto barDto)
        {
            var bar = await _context.Bars.FindAsync(id);

            if (bar == null)
            {
                throw new KeyNotFoundException("Bar con el ID especificado no encontrada.");
            }

            // Actualizar propiedades desde BarDto
            bar.Name = barDto.Name;

            _context.Bars.Update(bar);
            await _context.SaveChangesAsync();

            return bar;
        }


        public async Task DeleteBarAsync(int id)
        {
            var bar = await _context.Bars.FindAsync(id);

            if (bar == null)
            {
                throw new KeyNotFoundException("Bar no encontrada.");
            }

            _context.Bars.Remove(bar);
            await _context.SaveChangesAsync();
        }


        public async Task<BarWithMenuDto> GetAllBarWithMenusByIdAsync(int id)
        {

           
            var bar = await _context.Bars
                .Include(b => b.Menus) // Incluir los menús relacionados
                .Where(b => b.Id == id)
                .Select(b => new BarWithMenuDto
                {
                    BarId = b.Id,
                    Name = b.Name,
                    Menus = b.Menus.Select(m => new BarWithMenuDto.MenuDto
                    {
                        Id = m.Id,
                        Name = m.Name
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (bar == null)
            {
                throw new KeyNotFoundException("Bar not found");
            }

            return bar;
        }

        public async Task<List<BarWithMenuDto>> GetAllBarWithMenusAsync()
        {
            var barsWithMenus = await _context.Bars
                .Include(b => b.Menus) // Incluir los menús relacionados
                .Select(b => new BarWithMenuDto
                {
                    BarId = b.Id,
                    Name = b.Name,
                    Menus = b.Menus.Select(m => new BarWithMenuDto.MenuDto
                    {
                        Id = m.Id,
                        Name = m.Name
                    }).ToList()
                })
                .ToListAsync();

            return barsWithMenus;
        }

    }
}



