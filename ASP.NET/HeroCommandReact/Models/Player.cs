using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeroCommandReact.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public int Coin { get; set; }
        public int MissionsSinceUpgrade { get; set; }
    }
}
