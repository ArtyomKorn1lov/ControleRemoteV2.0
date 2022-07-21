using Application;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private ControlRemoteDbContext _controlRemoteDbContext;

        public UnitOfWork(ControlRemoteDbContext controlRemoteDbContext)
        {
            _controlRemoteDbContext = controlRemoteDbContext;
        }

        public async Task Commit()
        {
            await _controlRemoteDbContext.SaveChangesAsync();
        }
    }
}
