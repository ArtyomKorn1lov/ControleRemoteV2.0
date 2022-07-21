using System;
using Application.Command;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Dto;

namespace Web.DtoConverter
{
    public static class EmployerDtoConverter
    {
        public static EmployerTransferCommand EmployerModelConvertToEmployerTransferCommand(EmployerModel employer)
        {
            if(employer == null)
            {
                return null;
            }
            return new EmployerTransferCommand
            {
                Id = employer.Id,
                ManagerId = employer.ManagerId,
                Login = employer.Login,
                Name = employer.Name
            };
        }

        public static EmployerCreateCommand EmployerCreateModelConvertToEmployerCreateCommand(EmployerCreateModel employer)
        {
            if(employer == null)
            {
                return null;
            }
            return new EmployerCreateCommand
            {
                ManagerId = employer.ManagerId,
                Login = employer.Login,
                Name = employer.Name
            };
        }

        public static EmployerModel EmployerTransferCommandConvertToEmployerModel(EmployerTransferCommand employer)
        {
            if(employer == null)
            {
                return null;
            }
            return new EmployerModel
            {
                Id = employer.Id,
                ManagerId = employer.ManagerId,
                Login = employer.Login,
                Name = employer.Name
            };
        }
    }
}
