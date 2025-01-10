using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Dtos
{
    public class UserForAddRequest
    {
        public string Username { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Pass { get; set; }
    }
}
