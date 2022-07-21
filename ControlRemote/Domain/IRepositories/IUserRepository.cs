using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.IRepositories
{
    public interface IUserRepository
    {
        Task<User> GetLoginModel(string login, string password);
        Task<User> GetRegisterModel(string login);
        Task CreateUser(User user);
        Task<List<User>> GetUsers();
        Task UpdateUser(User user);
        Task RemoveUser(int id);
        Task<User> GetUserById(int id);
        Task<List<User>> GetUserByName(string name);
        Task<User> GetUserByLogin(string login);
    }
}
