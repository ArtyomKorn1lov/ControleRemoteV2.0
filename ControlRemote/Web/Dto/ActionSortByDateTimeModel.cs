using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Dto
{
    public class ActionSortByDateTimeModel
    {
        public DateTime DateTimeAction { get; set; }
        public List<ActionSortByHourTimeModel> Commands { get; set; }
    }
}
