using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    // точки активности
    public class ActionPoint
    {
        public int Id { get; set; }
        public string UserLogin { get; set; }
        public DateTime DateTimeAction { get; set; }
        public string Station { get; set; }
        public byte FlagImg { get; set; }
    }
}
