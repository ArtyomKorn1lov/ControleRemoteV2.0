using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Dto;
using Application.Command;

namespace Web.DtoConverter
{
    public static class UserDtoConverter
    {
        public static UserModel UserTransferCommandConvertToUserDto(UserTransferCommand user)
        {
            if(user == null)
            {
                return null;
            }
            return new UserModel
            {
                Id = user.Id,
                Name = user.Name,
                Login = user.Login
            };
        }

        public static UserCreateCommand RegisterModelConvertToUserCreateCommand(RegisterModel registerModel)
        {
            if(registerModel == null)
            {
                return null;
            }
            return new UserCreateCommand
            {
                Name = registerModel.Name,
                Login = registerModel.Login,
                Password = registerModel.Password
            };
        }

        public static UserCreateCommand UserCreateModelConvertToUserCreateCommand(UserCreateModel userModel)
        {
            if(userModel == null)
            {
                return null;
            }
            return new UserCreateCommand
            {
                Name = userModel.Name,
                Login = userModel.Login,
                Password = userModel.Password
            };
        }

        public static UserUpdateCommand UserUpdateModelConvertToUserUpdateCommand(UserUpdateModel userModel)
        {
            if(userModel == null)
            {
                return null;
            }
            return new UserUpdateCommand
            {
                Id = userModel.Id,
                Name = userModel.Name,
                Login = userModel.Login,
                Password = userModel.Password
            };
        }
    }
}
