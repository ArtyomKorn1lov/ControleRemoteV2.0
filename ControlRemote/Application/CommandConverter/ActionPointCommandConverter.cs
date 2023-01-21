using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entity;
using Application.Command;

namespace Application.CommandConverter
{
    public static class ActionPointCommandConverter
    {
        public static ActionPointCommand ConvertEntityToCommand(ActionPoint actionPoint)
        {
            if(actionPoint == null)
            {
                return null;
            }
            return new ActionPointCommand
            {
                Id = actionPoint.Id,
                UserDomain = actionPoint.UserDomain,
                UserLogin = actionPoint.UserLogin,
                DateTimeAction = actionPoint.DateTimeAction,
                Station = actionPoint.Station,
                FlagImg = actionPoint.FlagImg
            };
        }
    }
}
