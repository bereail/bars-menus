namespace WebApplication1.Models.Dtos
{
    public class BarWithMenuDto
    {
        public int BarId { get; set; }
        public string Name { get; set; }
        public List<MenuDto> Menus { get; set; }

        public class MenuDto
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }
    }
}
