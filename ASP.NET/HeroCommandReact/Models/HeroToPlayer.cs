using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HeroCommandReact.Models
{
    public class HeroToPlayer
    {
        [Key, Column(Order = 0)]
        public int HeroId { get; set; }
        [Key, Column(Order = 1)]
        public int PlayerId { get; set; }
        public int HeroAdditionalSkill { get; set; }
    }
}
