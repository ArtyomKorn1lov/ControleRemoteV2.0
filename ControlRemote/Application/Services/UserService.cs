using Application.Command;
using Application.CommandConverter;
using Domain.Entity;
using Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> CreateUser(UserCreateCommand user)
        {
            try
            {
                if (user != null)
                {
                    await _userRepository.CreateUser(UserCommandConverter.UserCreateCommandConvertToUserEntity(user));
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> GetLoginResult(string login, string password)
        {
            try
            {
                if (login == null || password == null)
                {
                    return false;
                }
                User user = await _userRepository.GetLoginModel(login, password);
                if (user == null)
                {
                    return false;
                }
                return true;
            }
            catch
            {
                return true;
            }
        }

        public async Task<bool> GetRegisterResult(string login)
        {
            try
            {
                if(login == null)
                {
                    return false;
                }
                User user = await _userRepository.GetRegisterModel(login);
                if (user == null)
                {
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<UserTransferCommand> GetUserById(int id)
        {
            try
            {
                UserTransferCommand userCommand = UserCommandConverter.UserEntityConvertToUserTransferCommand(await _userRepository.GetUserById(id));
                if(userCommand == null)
                {
                    return null;
                }
                return userCommand;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<UserTransferCommand>> GetUserByName(string name)
        {
            try
            {
                List<User> usersEntity = await _userRepository.GetUserByName(name);
                List<UserTransferCommand> userCommands = usersEntity.Select(data => UserCommandConverter.UserEntityConvertToUserTransferCommand(data)).ToList();
                if (userCommands == null)
                {
                    return null;
                }
                return userCommands;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<string>> GetLoginsByUserLogin(string login)
        {
            try
            {
                User user = await _userRepository.GetUserByLogin(login);
                List<string> logins = UserCommandConverter.UserEntityConvertToLogins(user);
                return logins;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<UserTransferCommand>> GetUsers()
        {
            try
            {
                List<User> usersEntity = await _userRepository.GetUsers();
                List<UserTransferCommand> usersCommand = usersEntity.Select(data => UserCommandConverter.UserEntityConvertToUserTransferCommand(data)).ToList();
                if(usersCommand == null)
                {
                    return null;
                }
                return usersCommand;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> RemoveUser(int id)
        {
            try
            {
                await _userRepository.RemoveUser(id);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateUser(UserUpdateCommand user)
        {
            try
            {
                if (user != null)
                {
                    await _userRepository.UpdateUser(UserCommandConverter.UserUpdateCommandConvertToUserEntity(user));
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> SetUserToken(int id, string refreshToken)
        {
            try
            {
                User user = await _userRepository.GetUserById(id);
                if (user == null)
                    return false;
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<int> GetUserIdByLogin(string login)
        {
            try
            {
                User user = await _userRepository.GetUserByLogin(login);
                return user.Id;
            }
            catch
            {
                return 0;
            }
        }

        public async Task<UserTokenCommand> GetUserTokenbByLogin(string login)
        {
            try
            {
                User user = await _userRepository.GetUserByLogin(login);
                UserTokenCommand command = UserCommandConverter.UserEntityConvertToUserToken(user);
                return command;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> RefreshUserToken(int id, string refreshToken)
        {
            try
            {
                User user = await _userRepository.GetUserById(id);
                if (user == null)
                    return false;
                user.RefreshToken = refreshToken;
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<string> GetUserNameByLogin(string login)
        {
            try
            {
                User user = await _userRepository.GetUserByLogin(login);
                if (user == null)
                    return null;
                return user.Name;
            }
            catch
            {
                return null;
            }
        }
    }
}
