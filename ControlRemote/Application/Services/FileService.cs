using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class FileService : IFileService
    {
        public async Task<byte[]> ReadFile(string path)
        {
            bool fileExist = File.Exists(path);
            if (fileExist)
                return await File.ReadAllBytesAsync(path);
            return null;
        }
    }
}
