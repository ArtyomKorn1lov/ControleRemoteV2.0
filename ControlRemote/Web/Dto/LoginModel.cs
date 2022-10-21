using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Dto
{
    public class LoginModel
    {
        public string Login { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
