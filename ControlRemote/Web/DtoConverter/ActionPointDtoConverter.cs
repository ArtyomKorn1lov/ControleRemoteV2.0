using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Dto;
using Application.Command;

namespace Web.DtoConverter
{
    public static class ActionPointDtoConverter
    {
        public static ActionSortByUserLoginModel ConvertCommandToModel(ActionSortByUserLoginCommand command)
        {
            if(command == null)
            {
                return null;
            }
            return new ActionSortByUserLoginModel
            {
                UserLogin = command.UserLogin,
                Commands = command.Commands.Select(d => new ActionSortByDateTimeModel
                {
                    DateTimeAction = d.DateTimeAction,
                    Commands = d.Commands.Select(d => new ActionSortByHourTimeModel
                    {
                        HourTimeAction = d.HourTimeAction,
                        Commands = d.Commands.Select(d => new ActionPointAtTimeModel 
                        {
                            EnableAction = d.EnableAction,
                            FlagImg = d.FlagImg,
                            ImagePath = d.ImagePath
                        }).ToList()
                    }).ToList()
                }).ToList()
            };
        }
    }
}
