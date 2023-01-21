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
    public class EmployerService : IEmployerService
    {
        private IEmployerRepository _employerRepository;

        public EmployerService(IEmployerRepository employerRepository)
        {
            _employerRepository = employerRepository;
        }

        public async Task<bool> Create(EmployerCreateCommand employer)
        {
            try
            {
                if(employer != null)
                {
                    await _employerRepository.Create(EmployerCommandConverter.EmployerCreateConvertToEmployerEntity(employer));
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                await _employerRepository.Delete(id);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<EmployerTransferCommand>> GetAll()
        {
            try
            {
                List<Employer> employersEntity = await _employerRepository.GetAll();
                List<EmployerTransferCommand> employersCommand = employersEntity.Select(data => EmployerCommandConverter.EmployerEntityConvertToEmployerTransferCommand(data)).ToList();
                return employersCommand;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<string>> GetAllLogins()
        {
            try
            {
                List<Employer> employers = await _employerRepository.GetAll();
                List<string> logins = employers.Select(data => EmployerCommandConverter.EmployerEntityConvertToLoginList(data)).ToList();
                return logins;
            }
            catch
            {
                return null;
            }
        }

        public async Task<EmployerTransferCommand> GetById(int id)
        {
            try
            {
                EmployerTransferCommand employerCommand = EmployerCommandConverter.EmployerEntityConvertToEmployerTransferCommand(await _employerRepository.GetById(id));
                return employerCommand;
            }
            catch
            {
                return null;
            }
        }

        public async Task<EmployerTransferCommand> GetByLogin(string login)
        {
            try
            {
                EmployerTransferCommand employerCommand = EmployerCommandConverter.EmployerEntityConvertToEmployerTransferCommand(await _employerRepository.GetByLogin(login));
                return employerCommand;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<EmployerTransferCommand>> GetByManagerId(int id)
        {
            try
            {
                List<Employer> employers = await _employerRepository.GetByManagerId(id);
                List<EmployerTransferCommand> commands = employers.Select(data => EmployerCommandConverter.EmployerEntityConvertToEmployerTransferCommand(data)).ToList();
                return commands;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<EmployerTransferCommand>> GetByName(string name, int id)
        {
            try
            {
                List<Employer> employersEntity = await _employerRepository.GetByName(name, id);
                List<EmployerTransferCommand> employersCommands = employersEntity.Select(data => EmployerCommandConverter.EmployerEntityConvertToEmployerTransferCommand(data)).ToList();
                return employersCommands;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> Update(EmployerTransferCommand employer)
        {
            try
            {
                if(employer != null)
                {
                    await _employerRepository.Update(EmployerCommandConverter.EmployerTransferCommandConvertToEmployerEntity(employer));
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
