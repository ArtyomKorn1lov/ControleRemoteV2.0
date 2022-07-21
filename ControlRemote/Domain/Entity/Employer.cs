using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Employer
    {
        public int Id { get; set; }
        public int ManagerId { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }

        public void CopyFrom(Employer employer)
        {
            Id = employer.Id;
            ManagerId = employer.ManagerId;
            Name = employer.Name;
            Login = employer.Login;
        }
    }
}
