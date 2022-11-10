using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Dto
{
    public class ActionSortByUserLoginModel
    {
        public string UserLogin { get; set; }
        public string Station { get; set; }
        public List<ActionSortByDateTimeModel> Commands { get; set; }
    }
}
