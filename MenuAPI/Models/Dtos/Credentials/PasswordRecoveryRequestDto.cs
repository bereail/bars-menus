using System.ComponentModel.DataAnnotations;

namespace MiniMarket_API.Application.DTOs.Requests.Credentials
{
    public class PasswordRecoveryRequestDto
    {
        [Required(ErrorMessage = "Email is Required.")]
        [EmailAddress(ErrorMessage = "Email provided must be a valid Email format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Email Confirmation is Required.")]
        [Compare(nameof(Email), ErrorMessage = "Emails do not match.")]
        public string ConfirmEmail { get; set; }
    }
}
