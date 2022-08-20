﻿using MongoDB.Driver;
using Rolls.Models.Rolls;

namespace Rolls.Mongo
{
    public class MyMongo
    {
        public static readonly IMongoCollection<MyUser> UsersCollection;
        public static readonly IMongoCollection<ProdgectInfo> ProdgectInfoCollection;
        internal static readonly IMongoCollection<BatchRolls> BatchRollsCollection;

        static MyMongo()
        {
            string connectionString;
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
                connectionString = "mongodb://testR:testR@31.31.201.81:6890/?authSource=TestRolls";
            else
                connectionString=Program.ConnectionString;
            MongoClient client = new(connectionString);
            IMongoDatabase databaseInventory = client.GetDatabase("TestRolls");
            UsersCollection = databaseInventory.GetCollection<MyUser>("Users");
            ProdgectInfoCollection = databaseInventory.GetCollection<ProdgectInfo>("ProdgectInfo");
            BatchRollsCollection = databaseInventory.GetCollection<BatchRolls>("BatchRolls");
        }
    }
}
