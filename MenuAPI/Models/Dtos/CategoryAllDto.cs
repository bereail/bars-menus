namespace WebApplication1.Models.Dtos
{
    public class CategoryAllDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ProductAllDto> Products { get; set; }
    }
}
