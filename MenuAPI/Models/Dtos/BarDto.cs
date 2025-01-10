namespace WebApplication1.Models.Dtos
{
    public class BarDto
    {
        public string Name { get; set; }

        public int? UserId { get; set; }


        public virtual ICollection<Menu> Menus { get; set; } = new List<Menu>();
    }
}
