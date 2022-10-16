using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.IRepositories
{
    public interface IEmployerRepository
    {
        Task<List<Employer>> GetAll();
        Task<Employer> GetById(int id);
        Task<List<Employer>> GetByName(string name, int id);
        Task<List<Employer>> GetByManagerId(int id);
        Task Create(Employer employer);
        Task Update(Employer employer);
        Task Delete(int id);
    }
}
