using Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class ControlRemoteDbContext : DbContext
    {
        public ControlRemoteDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new ActionPointConfiguration());
            builder.ApplyConfiguration(new EmployerConfiguration());
            builder.ApplyConfiguration(new UserConfiguration());
        }
    }
}
