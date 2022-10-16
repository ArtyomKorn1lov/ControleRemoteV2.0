using Application.Command;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IEmployerService
    {
        Task<List<EmployerTransferCommand>> GetAll();
        Task<EmployerTransferCommand> GetById(int id);
        Task<List<EmployerTransferCommand>> GetByName(string name, int id);
        Task<List<EmployerTransferCommand>> GetByManagerId(int id);
        Task<bool> Create(EmployerCreateCommand employer);
        Task<bool> Update(EmployerTransferCommand employer);
        Task<bool> Delete(int id);
        Task<List<string>> GetAllLogins();
    }
}
