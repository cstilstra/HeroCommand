﻿namespace HeroCommandReact.Models
{
    public class Mission
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SkillCost { get; set; }
        public int Reward { get; set; }
        public int DurationMs { get; set; }
        public int PlayerLevelVisible { get; set; }
    }
}
