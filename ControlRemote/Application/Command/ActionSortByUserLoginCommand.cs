using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command
{
    public class ActionSortByUserLoginCommand
    {
        public string UserDomain { get; set; }
        public string UserLogin { get; set; }
        public string Name { get; set; }
        public string Station { get; set; }
        public List<ActionSortByDateTimeCommand> Commands { get; set; }
    }
}
