using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command
{
    public class ActionSortByHourTimeCommand
    {
        public DateTime HourTimeAction { get; set; }
        public List<ActionPointAtTimeCommand> Commands { get; set; }
    }
}
