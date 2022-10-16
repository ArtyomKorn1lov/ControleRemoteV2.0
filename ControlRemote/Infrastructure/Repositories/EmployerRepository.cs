using Domain.Entity;
using Domain.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class EmployerRepository : IEmployerRepository
    {
        private ControlRemoteDbContext _controlRemoteDbContext;

        public EmployerRepository(ControlRemoteDbContext controlRemoteDbContext)
        {
            _controlRemoteDbContext = controlRemoteDbContext;
        }

        public async Task Create(Employer employer)
        {
            await _controlRemoteDbContext.Set<Employer>().AddAsync(employer);
        }

        public async Task Delete(int id)
        {
            Employer employer = await GetById(id);
            if (employer != null)
                _controlRemoteDbContext.Set<Employer>().Remove(employer);
        }

        public async Task<List<Employer>> GetAll()
        {
            return await _controlRemoteDbContext.Set<Employer>().ToListAsync();
        }

        public async Task<Employer> GetById(int id)
        {
            return await _controlRemoteDbContext.Set<Employer>().FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<List<Employer>> GetByManagerId(int id)
        {
            return await _controlRemoteDbContext.Set<Employer>().Where(e => e.ManagerId == id).ToListAsync();
        }

        public async Task<List<Employer>> GetByName(string name, int id)
        {
            return await _controlRemoteDbContext.Set<Employer>().Where(e => EF.Functions.Like(e.Name, "%"+name+"%") && e.ManagerId == id).ToListAsync();
        }

        public async Task<List<Employer>> GetByUserLogin(string login)
        {
            return await _controlRemoteDbContext.Set<Employer>().Where(e => EF.Functions.Like(e.Login, login)).ToListAsync();
        }

        public async Task Update(Employer employer)
        {
            Employer _employer = await GetById(employer.Id);
            _employer.CopyFrom(employer);
        }
    }
}
