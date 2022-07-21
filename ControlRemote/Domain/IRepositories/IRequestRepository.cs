using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entity;

namespace Domain.IRepositories
{
    public interface IRequestRepository
    {
        Task<List<ActionPoint>> GetAllForTime(DateTime startDateTime, DateTime finalDateTime);
        Task<List<ActionPoint>> GetByLoginEmployerForTime(string login, DateTime startDateTime, DateTime finalDateTime);
    }
}
