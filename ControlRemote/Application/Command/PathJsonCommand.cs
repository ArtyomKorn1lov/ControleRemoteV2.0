using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Command
{
    public class PathJsonCommand
    {
        public string Path { get; set; }

        public PathJsonCommand(string path)
        {
            Path = path;
        }
    }
}
