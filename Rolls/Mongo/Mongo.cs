using MongoDB.Driver;
using Rolls.Models;
using Rolls.Models.Rolls;
using Rolls.Mongo.ProdgectInfoFolder;

namespace Rolls.Mongo;

public class MongoService
{
    public readonly IMongoCollection<MyUser> UsersCollection;
    public readonly IMongoCollection<ProdgectInfo> ProdgectInfoCollection;
    internal readonly IMongoCollection<BatchRolls> BatchRollsCollection;
    internal readonly IMongoCollection<Counterparties> CounterpartiesCollection;
    internal readonly IMongoCollection<LogElement> LogsCollection;

    public MongoService()
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
