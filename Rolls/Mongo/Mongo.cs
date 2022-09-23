using MongoDB.Driver;
using Rolls.Models;
using Rolls.Models.Rolls;

namespace Rolls.Mongo
{
    public class MyMongo
    {
        public static readonly IMongoCollection<MyUser> UsersCollection;
        public static readonly IMongoCollection<ProdgectInfo> ProdgectInfoCollection;
        internal static readonly IMongoCollection<BatchRolls> BatchRollsCollection;
        internal static readonly IMongoCollection<Counterparties> CounterpartiesCollection;
        internal static readonly IMongoCollection<LogElement> LogsCollection;

        static MyMongo()
        {
            string connectionString = Program.ConnectionString;
            string name = Program.NameDataBase;
            MongoClient client = new(connectionString);
            IMongoDatabase databaseInventory = client.GetDatabase(name);
            UsersCollection = databaseInventory.GetCollection<MyUser>("Users");
            ProdgectInfoCollection = databaseInventory.GetCollection<ProdgectInfo>("ProdgectInfo");
            BatchRollsCollection = databaseInventory.GetCollection<BatchRolls>("BatchRolls");
            CounterpartiesCollection = databaseInventory.GetCollection<Counterparties>("Counterparties");
            LogsCollection = databaseInventory.GetCollection<LogElement>("Logs");
        }
    }
}
