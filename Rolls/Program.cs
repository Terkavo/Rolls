using Rolls.Models.Rolls;
using Rolls.Mongo;

namespace Rolls
{
    public class Program
    {
        public static string ConnectionString;
        public static void Main(string[] args)
        {
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Development")
                ConnectionString=args[0];
            BeforeTheStart();
            CreateHostBuilder().Build().Run();
        }

        public static IHostBuilder CreateHostBuilder() =>
            Host.CreateDefaultBuilder()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
        private static void BeforeTheStart()
        {
            ProdgectInfo.Collection=MyMongo.ProdgectInfoCollection;
            BatchRolls.Collection=MyMongo.BatchRollsCollection;
        }
    }
}