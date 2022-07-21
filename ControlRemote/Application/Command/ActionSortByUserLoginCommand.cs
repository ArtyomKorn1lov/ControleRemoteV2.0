using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command
{
    public class ActionSortByUserLoginCommand
    {
        public string UserLogin { get; set; }
        public List<ActionSortByDateTimeCommand> Commands { get; set; }
    }
}
