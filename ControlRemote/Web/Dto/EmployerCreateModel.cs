using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Dto
{
    public class EmployerCreateModel
    {
        public int ManagerId { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
    }
}
