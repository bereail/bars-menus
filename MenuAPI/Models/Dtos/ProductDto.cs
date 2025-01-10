using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Dtos
{
    public class ProductDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int MenuId { get; set; }
    }

}
