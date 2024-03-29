﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    // описание таблицы пользователей
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public List<Employer> Employers { get; set; }

        public void CopyFrom(User user)
        {
            Name = user.Name;
            Login = user.Login;
            Password = user.Password;
            Employers = user.Employers;
        }
    }
}
