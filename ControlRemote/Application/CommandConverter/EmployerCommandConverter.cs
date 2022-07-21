using Application.Command;
using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandConverter
{
    public static class EmployerCommandConverter
    {
        public static Employer EmployerCreateConvertToEmployerEntity(EmployerCreateCommand employer)
        {
            if(employer == null)
            {
                return null;
            }
            return new Employer
            {
                ManagerId = employer.ManagerId,
                Name = employer.Name,
                Login = employer.Login
            };
        }

        public static Employer EmployerTransferCommandConvertToEmployerEntity(EmployerTransferCommand employer)
        {
            if(employer == null)
            {
                return null;
            }
            return new Employer
            {
                Id = employer.Id,
                ManagerId = employer.ManagerId,
                Name = employer.Name,
                Login = employer.Login
            };
        }

        public static EmployerTransferCommand EmployerEntityConvertToEmployerTransferCommand(Employer employer)
        {
            if(employer == null)
            {
                return null;
            }
            return new EmployerTransferCommand
            {
                Id = employer.Id,
                ManagerId = employer.ManagerId,
                Name = employer.Name,
                Login = employer.Login
            };
        }

        public static string EmployerEntityConvertToLoginList(Employer employer)
        {
            if(employer == null)
            {
                return null;
            }
            return employer.Login;
        }
    }
}
