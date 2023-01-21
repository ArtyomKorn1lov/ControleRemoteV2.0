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
    public class UserRepository : IUserRepository
    {
        private ControlRemoteDbContext _controlRemoteDbContext;

        public UserRepository(ControlRemoteDbContext context)
        {
            _controlRemoteDbContext = context;
        }

        public async Task CreateUser(User user)
        {
            await _controlRemoteDbContext.Set<User>().AddAsync(user);
        }

        public async Task<User> GetLoginModel(string login, string password)
        {
            return await _controlRemoteDbContext.Set<User>().FirstOrDefaultAsync(u => u.Login == login && u.Password == password);
        }

        public async Task<User> GetRegisterModel(string login)
        {
            return await _controlRemoteDbContext.Set<User>().FirstOrDefaultAsync(u => u.Login == login);
        }

        public async Task<User> GetUserById(int id)
        {
            return await _controlRemoteDbContext.Set<User>().FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByLogin(string login)
        {
            return await _controlRemoteDbContext.Set<User>().Include(u => u.Employers).FirstOrDefaultAsync(u => u.Login == login);
        }

        public async Task<List<User>> GetUserByName(string name)
        {
            return await _controlRemoteDbContext.Set<User>().Where(u => 
            (EF.Functions.Like(u.Name, "%"+name+"%") || EF.Functions.Like(u.Login, "%" + name + "%")) && u.Login != "Admin").ToListAsync();
        }

        public async Task<List<User>> GetUsers()
        {
            return await _controlRemoteDbContext.Set<User>().Where(u => u.Login != "Admin").ToListAsync();
        }

        public async Task RemoveUser(int id)
        {
            User user = await GetUserById(id);
            if (user != null)
                _controlRemoteDbContext.Set<User>().Remove(user);
        }

        public async Task UpdateUser(User user)
        {
            User _user = await GetUserById(user.Id);
            _user.CopyFrom(user);
        }
    }
}
