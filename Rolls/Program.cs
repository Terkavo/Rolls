using MongoDB.Bson.Serialization;
using Rolls.Models;
using Rolls.Models.Rolls;
using Rolls.Mongo;

namespace Rolls;

public class Program
{
    public static string ConnectionString;

    public static string NameDataBase;

    public static void Main(string[] args)
    {
        ConnectionString=args[0];
        NameDataBase=args[1];
        BeforeTheStart().Wait();
        CreateHostBuilder().Build().Run();
    }

    public static IHostBuilder CreateHostBuilder() =>
        Host.CreateDefaultBuilder()
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
    private static async Task BeforeTheStart()
    {
        BsonSerializer.RegisterSerializer(typeof(DateTime), new MyMongoDBDateTimeSerializer());
        ProdgectInfo.Collection=MyMongo.ProdgectInfoCollection;
        BatchRolls.Collection=MyMongo.BatchRollsCollection;
        Counterparties.Collection=MyMongo.CounterpartiesCollection;
        MyUser.Collection=MyMongo.UsersCollection;
        LogElement.Collection=MyMongo.LogsCollection;
        await Counterparties.OnStartAsync();
    }
}