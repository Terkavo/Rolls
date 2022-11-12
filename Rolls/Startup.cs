using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.WebEncoders;
using Microsoft.IdentityModel.Tokens;
using Rolls.Auxiliary.AntiBruteforce;
using Rolls.Controllers.Outh;
using Rolls.Models;
using Rolls.Models.LogsFolder;
using Rolls.Models.Rolls;
using Rolls.Mongo;
using Rolls.Mongo.ProdgectInfoFolder;
using Rolls.Mongo.Users;
using System.Text.Encodings.Web;
using System.Text.Unicode;

namespace Rolls
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        public void Configure(IApplicationBuilder app)
        {
            app.UseResponseCompression();
            app.UseMiddleware<AntiBruteforceMiddleware>();
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers.Add("Cache-Control", "public,only-if-cached");
                }
            });
            app.UseRouting();
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "wwwroot";
            });
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<WebEncoderOptions>(options =>
            {
                options.TextEncoderSettings = new TextEncoderSettings(UnicodeRanges.All);
            });
            services.AddDistributedMemoryCache();
            services.AddSession();
            services
                .AddMvc(options =>
                {
                    options.EnableEndpointRouting = false;
                });
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey =  AuthOptions.GetSymmetricSecurityKey(),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                };
            });
            services.AddTransient<IAuthorizationHandler, FullAccessHandler>();
            services.AddTransient<IAuthorizationHandler, CanSetRollIsUsedUpHandler>();
            services.AddAuthorization(x =>
            {
                x.AddPolicy("FullAccess",
                    policy => policy.Requirements.Add(new FullAccessPlug()));
                x.AddPolicy("CanSetRollIsUsedUp",
                    policy => policy.Requirements.Add(new CanSetRollIsUsedUpPlug()));
            });
            services.AddCors(options =>
                options.AddDefaultPolicy(builder =>
                    builder.WithOrigins("http://localhost:4200").
                    WithMethods("GET", "POST").
                    SetPreflightMaxAge(TimeSpan.FromDays(1000)).
                    AllowAnyHeader().
                    AllowCredentials()));
            services.AddControllersWithViews();
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
            });

            services.AddSingleton<MyUserServise>();
            services.AddSingleton<CounterpartiesService>();
            services.AddSingleton<ProjectInfoService>();
            services.AddSingleton<BatchRollsService>();
            services.AddSingleton<MongoService>();
            services.AddSingleton<LogsService>();
        }
    }
}
