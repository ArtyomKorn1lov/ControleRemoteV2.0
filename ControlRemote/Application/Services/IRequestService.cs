using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Command;

namespace Application.Services
{
    public interface IRequestService
    {
        Task<List<ActionSortByUserLoginCommand>> GetAllForTime(DateTime startDateTime, DateTime finalDateTime, string appEnvironment);
        Task<List<ActionSortByUserLoginCommand>> GetByLoginEmployerForTime(List<string> logins, DateTime startDateTime, DateTime finalDateTime, string appEnvironment);
    }
}
