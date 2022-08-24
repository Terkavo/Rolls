using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Rolls.Mongo;

namespace Rolls.Models
{
    [BsonIgnoreExtraElements]
    public class Counterparties : Downloadable<Counterparties>
    {
        public List<string> ListCounterparties { get; set; } = new();
        public string Type { get; set; }
        public Counterparties(string type)
        {
            Type = type;
        }
        static public async Task OnStartAsync()
        {
            var res = await GetAllCounterparties();
            if (!res.Exists(x => x.Type=="In"))
                await Collection.InsertOneAsync(new Counterparties("In"));
            if (!res.Exists(x => x.Type=="Out"))
                await Collection.InsertOneAsync(new Counterparties("Out"));
            if (!res.Exists(x => x.Type=="Colors"))
                await Collection.InsertOneAsync(new Counterparties("Colors"));
            if (!res.Exists(x => x.Type=="Materials"))
                await Collection.InsertOneAsync(new Counterparties("Materials"));
        }
        static public async Task AddCounterparty(string type, string title)
        {
            var filter = new BsonDocument("Type", type);
            var update = Builders<Counterparties>.Update
                .Push(c => c.ListCounterparties, title);
            await Collection.UpdateOneAsync(filter, update);
        }

        internal static async Task<List<Counterparties>> GetAllCounterparties()
        {
            var res = await Collection.FindAsync<Counterparties>(new BsonDocument());
            var list = res.ToList();
            list.ForEach(x => x.ListCounterparties.Reverse());
            return list;
        }
        internal static async Task<List<string>> GetCounterparty(string type)
        {
            var res = await Collection.FindAsync<Counterparties>(new BsonDocument("Type", type));
            var ret = res.First();
            ret.ListCounterparties.Reverse();
            return ret.ListCounterparties;
        }
    }
}
