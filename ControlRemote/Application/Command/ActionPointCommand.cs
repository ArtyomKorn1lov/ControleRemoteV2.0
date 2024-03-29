﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command
{
    public class ActionPointCommand
    {
        public int Id { get; set; }
        public string UserDomain { get; set; }
        public string UserLogin { get; set; }
        public string Name { get; set; }
        public DateTime DateTimeAction { get; set; }
        public string Station { get; set; }
        public byte FlagImg { get; set; }
    }
}
