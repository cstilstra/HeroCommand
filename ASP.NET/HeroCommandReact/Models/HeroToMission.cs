using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HeroCommandReact.Models
{
    public class HeroToMission
    {
        [Key, Column(Order = 0)]
        public int HeroId { get; set; }
        [Key, Column(Order = 1)]
        public int PlayerId { get; set; }
        public int MissionId { get; set; }
        public DateTime FinishesAt { get; set; }
    }
}
