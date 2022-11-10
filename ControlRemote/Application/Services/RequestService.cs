using Application.Command;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.IRepositories;
using Domain.Entity;
using Application.CommandConverter;
using System.IO;
using System.Text.Json;

namespace Application.Services
{
    public class RequestService : IRequestService
    {
        private const int HourFormat = 60;
        private const string ImageConfigName = "/image-config.json";
        private IRequestRepository _requestRepository;

        public RequestService(IRequestRepository requestRepository)
        {
            _requestRepository = requestRepository;
        }

        public async Task<List<ActionSortByUserLoginCommand>> GetAllForTime(DateTime startDateTime, DateTime finalDateTime, string appEnvironment)
        {
            try
            {
                List<ActionPoint> actionPoints = await _requestRepository.GetAllForTime(startDateTime, finalDateTime);
                List<ActionPointCommand> actionPointCommands = actionPoints.Select(data => ActionPointCommandConverter.ConvertEntityToCommand(data)).ToList();
                List<ActionSortByUserLoginCommand> actionSortByUserLoginCommands = await GenerateReport(actionPointCommands, appEnvironment);
                return actionSortByUserLoginCommands;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<ActionSortByUserLoginCommand>> GetByLoginEmployerForTime(List<string> logins, DateTime startDateTime, DateTime finalDateTime, string appEnvironment)
        {
            try
            {
                if(logins == null)
                {
                    return null;
                }
                List<ActionPoint> actionPoints = new List<ActionPoint>();
                for(int count = 0; count < logins.Count; count++)
                {
                    actionPoints = actionPoints.Concat(await _requestRepository.GetByLoginEmployerForTime(logins[count], startDateTime, finalDateTime)).ToList();
                }
                List<ActionPointCommand> actionPointCommands = actionPoints.Select(data => ActionPointCommandConverter.ConvertEntityToCommand(data)).ToList();
                List<ActionSortByUserLoginCommand> actionSortByUserLoginCommands = await GenerateReport(actionPointCommands, appEnvironment);
                return actionSortByUserLoginCommands;
            }
            catch
            {
                return null;
            }
        }

        private async Task<List<ActionSortByUserLoginCommand>> GenerateReport(List<ActionPointCommand> actionPointCommands, string appEnvironment)
        {
            List<ActionSortByUserLoginCommand> actionSortByUserLoginCommands = new List<ActionSortByUserLoginCommand>();
            string currentLogin = "";
            string currentName = "";
            Employer employer = new Employer();
            for(int count = 0; count < actionPointCommands.Count; count++)
            {
                if(currentLogin != actionPointCommands[count].UserLogin)
                {
                    currentLogin = actionPointCommands[count].UserLogin;
                    List<ActionPointCommand> _actionPointCommands = actionPointCommands.Where(d => d.UserLogin == currentLogin).ToList();
                    actionSortByUserLoginCommands.Add(new ActionSortByUserLoginCommand
                    {
                        UserLogin = actionPointCommands[count].UserLogin,
                        Station = actionPointCommands[count].Station,
                        Commands = await GenerateActionSortByDateTimeCommands(_actionPointCommands, appEnvironment)
                    });
                }
            }
            return actionSortByUserLoginCommands;
        }

        private async Task<List<ActionSortByDateTimeCommand>> GenerateActionSortByDateTimeCommands(List<ActionPointCommand> actionPointCommands, string appEnvironment)
        {
            List<ActionSortByDateTimeCommand> actionSortByDateTimeCommands = new List<ActionSortByDateTimeCommand>();
            DateTime dateTime = new DateTime();
            for(int count = 0; count < actionPointCommands.Count; count++)
            {
                if(dateTime != actionPointCommands[count].DateTimeAction.Date)
                {
                    dateTime = actionPointCommands[count].DateTimeAction.Date;
                    List<ActionPointCommand> _actionPointCommands = actionPointCommands.Where(d => d.DateTimeAction.Date == dateTime).ToList();
                    actionSortByDateTimeCommands.Add(new ActionSortByDateTimeCommand 
                    {
                        DateTimeAction = actionPointCommands[count].DateTimeAction,
                        Commands = await GenerateActionSortByHourTimeCommands(_actionPointCommands, appEnvironment)
                    });
                }
            }
            return actionSortByDateTimeCommands;
        }

        private async Task<List<ActionSortByHourTimeCommand>> GenerateActionSortByHourTimeCommands(List<ActionPointCommand> actionPointCommands, string appEnvironment)
        {
            List<ActionSortByHourTimeCommand> actionSortByHourTimeCommands = new List<ActionSortByHourTimeCommand>();
            int hourTime = 0;
            for(int count = 0; count < actionPointCommands.Count; count++)
            {
                if(hourTime != actionPointCommands[count].DateTimeAction.Hour 
                    || (hourTime == 0 && actionPointCommands[count].DateTimeAction.Hour == 0 && count == 0))
                {
                    hourTime = actionPointCommands[count].DateTimeAction.Hour;
                    List<ActionPointCommand> _actionPointCommands = actionPointCommands.Where(d => d.DateTimeAction.Hour == hourTime).ToList();
                    actionSortByHourTimeCommands.Add(new ActionSortByHourTimeCommand
                    {
                        HourTimeAction = actionPointCommands[count].DateTimeAction,
                        Commands = await GenerateActionPointAtTimeCommand(_actionPointCommands, appEnvironment)
                    });
                }
            }
            return actionSortByHourTimeCommands;
        }

        private async Task<List<ActionPointAtTimeCommand>> GenerateActionPointAtTimeCommand(List<ActionPointCommand> actionPointCommands, string appEnvironment)
        {
            List<ActionPointAtTimeCommand> actionPointAtTimeCommands = new List<ActionPointAtTimeCommand>();
            int minuteTime = 0;
            int action_count = 0;
            for(int count = 0; count < HourFormat; count++)
            {
                minuteTime = count;
                if(minuteTime == actionPointCommands[action_count].DateTimeAction.Minute 
                    || (minuteTime == 0 && actionPointCommands[action_count].DateTimeAction.Minute == 0))
                {
                    if(actionPointCommands[action_count].FlagImg == 1)
                    {
                        actionPointAtTimeCommands.Add(new ActionPointAtTimeCommand
                        {
                            FlagImg = actionPointCommands[action_count].FlagImg,
                            EnableAction = true,
                            ImagePath = await GeneratePathToImage(actionPointCommands[action_count], appEnvironment)
                        });
                    }
                    else
                    {
                        actionPointAtTimeCommands.Add(new ActionPointAtTimeCommand
                        {
                            FlagImg = actionPointCommands[action_count].FlagImg,
                            EnableAction = true,
                            ImagePath = null
                        });
                    }
                    if(action_count + 1 < actionPointCommands.Count)
                    {
                        action_count++;
                    }
                }
                else
                {
                    actionPointAtTimeCommands.Add(new ActionPointAtTimeCommand
                    {
                        FlagImg = 0,
                        EnableAction = false
                    });
                }
            }
            return actionPointAtTimeCommands;
        }

        private async Task<string> GeneratePathToImage(ActionPointCommand actionPointCommand, string appEnvironment)
        {
            try
            {
                string filePath = appEnvironment + ImageConfigName;
                using (FileStream stream = new FileStream(filePath, FileMode.OpenOrCreate))
                {
                    PathJsonCommand command = await JsonSerializer.DeserializeAsync<PathJsonCommand>(stream);
                    string imagePath = command.Path + "/" + actionPointCommand.Station;
                    string timeFolder = ConvertToTimeFormat(actionPointCommand.DateTimeAction.Day) + "_" + ConvertToTimeFormat(actionPointCommand.DateTimeAction.Month) + "_" + actionPointCommand.DateTimeAction.Year.ToString();
                    string imageName = actionPointCommand.UserLogin.Replace("\\", "#") + "#" + ConvertToTimeFormat(actionPointCommand.DateTimeAction.Day)
                        + "#" + ConvertToTimeFormat(actionPointCommand.DateTimeAction.Month) + "#" + actionPointCommand.DateTimeAction.Year.ToString()
                        + "#" + ConvertToTimeFormat(actionPointCommand.DateTimeAction.Hour) + "#" + ConvertToTimeFormat(actionPointCommand.DateTimeAction.Minute)
                        + "#" + ConvertToTimeFormat(actionPointCommand.DateTimeAction.Second) + ".png";
                    imagePath = imagePath + "/" + timeFolder + "/" + imageName;
                    return imagePath;
                }
            }
            catch
            {
                return null;
            }
        }

        private string ConvertToTimeFormat(int time)
        {
            if (time < 10)
                return "0" + time.ToString();
            return time.ToString();
        }
    }
}
