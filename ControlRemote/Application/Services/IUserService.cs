using Application.Command;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IUserService
    {
        Task<bool> GetLoginResult(string login, string password);
        Task<bool> GetRegisterResult(string login);
        Task<bool> SetUserToken(int id, string refreshToken);
        Task<bool> RefreshUserToken(int id, string refreshToken);
        Task<int> GetUserIdByLogin(string login);
        Task<UserTokenCommand> GetUserTokenbByLogin(string login);
        Task<bool> CreateUser(UserCreateCommand user);
        Task<List<UserTransferCommand>> GetUsers();
        Task<bool> UpdateUser(UserUpdateCommand user);
        Task<bool> RemoveUser(int id);
        Task<UserTransferCommand> GetUserById(int id);
        Task<List<UserTransferCommand>> GetUserByName(string name);
        Task<List<string>> GetLoginsByUserLogin(string login);
    }
}
