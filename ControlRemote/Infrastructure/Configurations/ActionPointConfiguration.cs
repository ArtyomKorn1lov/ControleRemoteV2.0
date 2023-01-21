using Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configurations
{
    public class ActionPointConfiguration : IEntityTypeConfiguration<ActionPoint>
    {
        public void Configure(EntityTypeBuilder<ActionPoint> builder)
        {
            builder.ToTable(nameof(ActionPoint));

            builder.HasKey(a => a.Id);
            builder.Property(a => a.UserDomain).IsRequired();
            builder.Property(a => a.UserLogin).IsRequired();
            builder.Property(a => a.DateTimeAction).IsRequired();
            builder.Property(a => a.Station).IsRequired();
            builder.Property(a => a.FlagImg).IsRequired();
        }
    }
}
