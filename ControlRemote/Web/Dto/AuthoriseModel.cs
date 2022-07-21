using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Dto
{
    public class AuthoriseModel
    { 
        public string Name { get; set; }
        public string Type { get; set; }

        public AuthoriseModel(string name, string type)
        {
            Name = name;
            Type = type;
        }
    }
}
