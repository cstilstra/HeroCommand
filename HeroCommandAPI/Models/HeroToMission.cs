﻿using System.ComponentModel.DataAnnotations;

namespace HeroCommandAPI.Models
{
    public class HeroToMission
    {
        [Key]
        public int HeroId { get; set; }
        public int MissionId { get; set; }
    }
}
