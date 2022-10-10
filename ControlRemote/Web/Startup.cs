using Application;
using Application.Services;
using Domain.IRepositories;
using Infrastructure;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace ControlRemote
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(); //отправка данных
            services.AddScoped<IUnitOfWork, UnitOfWork>(); // синхронизация запросов к бд
            services.AddScoped<IUserService, UserService>(); // инициализация сервисов (логика приложения)
            services.AddScoped<IEmployerService, EmployerService>();
            services.AddScoped<IRequestService, RequestService>();
            services.AddScoped<IUserRepository, UserRepository>(); // классы базы данных
            services.AddScoped<IEmployerRepository, EmployerRepository>();
            services.AddScoped<IRequestRepository, RequestRepository>();

            // аутентификация на уровне сервера
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.ExpireTimeSpan = TimeSpan.FromMinutes(10); // храним сессию 10 минут
                    options.LoginPath = new Microsoft.AspNetCore.Http.PathString("/Account/Login"); // путь к авторизации по умолчанию
                });

            // добавление бд
            services.AddDbContext<ControlRemoteDbContext>(options =>
            {
                string connectionString = Configuration.GetConnectionString("ControlConnection"); // путь к бд
                options.UseSqlServer(connectionString); 
            });
            // путь одностраничного приложения
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist"; // расположен клиентский код
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // разрешение миграции базы данных
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var recipeContext = serviceScope.ServiceProvider.GetService<ControlRemoteDbContext>();
                recipeContext.Database.Migrate();
            }
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            // скрип запуска одностраничного
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
