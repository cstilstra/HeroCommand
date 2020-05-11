namespace HeroCommandAPI.Models
{
    public class Mission
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int SkillCost { get; set; }
        public int Reward { get; set; }
    }
}
