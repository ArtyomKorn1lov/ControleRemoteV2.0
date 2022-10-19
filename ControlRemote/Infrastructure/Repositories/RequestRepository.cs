using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entity;
using Domain.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class RequestRepository : IRequestRepository
    {
        private ControlRemoteDbContext _controlRemoteDbContext;
        
        public RequestRepository(ControlRemoteDbContext context)
        {
            _controlRemoteDbContext = context;
        }

        public async Task<List<ActionPoint>> GetAllForTime(DateTime startDateTime, DateTime finalDateTime)
        {
            return await _controlRemoteDbContext.Set<ActionPoint>()
                .Where(d => d.DateTimeAction >= startDateTime && d.DateTimeAction < finalDateTime)
                .OrderBy(d => d.UserLogin)
                .ThenBy(d => d.DateTimeAction)
                .ToListAsync();
        }

        public async Task<List<ActionPoint>> GetByLoginEmployerForTime(string login, DateTime startDateTime, DateTime finalDateTime)
        {
            return await _controlRemoteDbContext.Set<ActionPoint>()
                .Where(d => EF.Functions.Like(d.UserLogin, "%"+login+"%") && (d.DateTimeAction >= startDateTime && d.DateTimeAction <= finalDateTime))
                .OrderBy(d => d.UserLogin)
                .ThenBy(d => d.DateTimeAction)
                .ToListAsync();
        }
    }
}
