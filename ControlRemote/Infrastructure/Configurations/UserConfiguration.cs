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
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable(nameof(User));

            builder.HasKey(m => m.Id);
            builder.Property(m => m.Name).IsRequired();
            builder.Property(m => m.Login).IsRequired();
            builder.Property(m => m.Password).IsRequired();
            builder.Property(m => m.RefreshToken);
            builder.Property(m => m.RefreshTokenExpiryTime);
            builder.HasMany(m => m.Employers).WithOne().HasForeignKey(e => e.ManagerId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
