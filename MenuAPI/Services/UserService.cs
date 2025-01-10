using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Services
{
    public class UserService : IUserService
     {
            private readonly RositaMenuDBContext _context;

            public UserService(RositaMenuDBContext context)
            {
                _context = context;
            }

            public async Task<User> AuthenticateAsync(string username, string password)
            {
                // Imprimir los valores que estás recibiendo para depuración
                Console.WriteLine($"Authenticating user: {username}");

                // Buscar el usuario en la base de datos por el nombre de usuario
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == username);

                if (user == null)
                {
                    Console.WriteLine("User not found.");
                    return null; // Usuario no encontrado
                }

                // Imprimir detalles del usuario encontrado para depuración
                Console.WriteLine($"User found: {user.Username}, Is Admin: {user.IsAdmin}");

                // Comparar la contraseña proporcionada con la almacenada
                if (user.Pass != password)
                {
                    Console.WriteLine("Password verification failed.");
                    return null; // Contraseña incorrecta
                }

                Console.WriteLine("User authenticated successfully.");
                return user; // Usuario autenticado correctamente
            }
        }
    }

