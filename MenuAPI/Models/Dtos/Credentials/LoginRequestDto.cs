using System.ComponentModel.DataAnnotations;

namespace MiniMarket_API.Application.DTOs.Requests.Credentials
{
    public class LoginRequestDTO
    {
        [Required(ErrorMessage = "Email is Required.")]
        [EmailAddress(ErrorMessage = "Email must be in a valid format.")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is Required.")]
        [MinLength(8, ErrorMessage = "Password provided must be at least 8 characters.")]
        public string? Password { get; set; }
    }
}
