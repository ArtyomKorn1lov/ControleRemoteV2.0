using Application.Command;
using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandConverter
{
    public static class UserCommandConverter
    {
        public static User UserCreateCommandConvertToUserEntity(UserCreateCommand user)
        {
            if(user == null)
            {
                return null;
            }
            return new User
            {
                Name = user.Name,
                Login = user.Login,
                Password = user.Password,
                Employers = null
            };
        }

        public static User UserUpdateCommandConvertToUserEntity(UserUpdateCommand user)
        {
            if (user == null)
            {
                return null;
            }
            return new User
            {
                Id = user.Id,
                Name = user.Name,
                Login = user.Login,
                Password = user.Password,
                Employers = null
            };
        }

        public static UserTransferCommand UserEntityConvertToUserTransferCommand(User user)
        {
            if(user == null)
            {
                return null;
            }
            return new UserTransferCommand
            {
                Id = user.Id,
                Name = user.Name,
                Login = user.Login,
            };
        }

        public static List<string> UserEntityConvertToLogins(User user)
        {
            if(user == null)
            {
                return null;
            }
            return user.Employers.Select(d => d.Login).ToList();
        }

        public static UserTokenCommand UserEntityConvertToUserToken(User user)
        {
            if (user == null)
            {
                return null;
            }
            return new UserTokenCommand
            {
                Id = user.Id,
                Login = user.Login,
                RefreshToken = user.RefreshToken,
                RefreshTokenExpiryTime = user.RefreshTokenExpiryTime
            };
        }
    }
}
