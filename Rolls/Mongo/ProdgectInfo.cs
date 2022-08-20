using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Rolls.Mongo
{
    public class ProdgectInfo : Downloadable<ProdgectInfo>
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public static async Task<ProdgectInfo> AsyncConstructor()
        {
            try
            {
                return await Upload();
            }
            catch (Exception ex) when (ex.Message=="NotFind")
            {
                ProdgectInfo prodgectInfo = new();
                await Collection.InsertOneAsync(prodgectInfo);
                return prodgectInfo;
            }
        }

        private uint _lastBatchRollsId;
        public uint LastBatchRollsId
        {
            get
            {
                _ =IncBatchRollsId();
                return _lastBatchRollsId++;
            }
            set
            {
                _lastBatchRollsId=value;
            }
        }
        public uint LastRollId;
        internal async Task IncRollCounter(uint count)
        {
            LastRollId+=count;
            var bilders = Builders<ProdgectInfo>.Update.Inc("LastRollId", count);
            var filter = new BsonDocument();
            await MyMongo.ProdgectInfoCollection.UpdateOneAsync(filter, bilders);
        }

        private static async Task IncBatchRollsId()
        {
            var bilders = Builders<ProdgectInfo>.Update.Inc("LastBatchRollsId", 1);
            var filter = new BsonDocument();
            await MyMongo.ProdgectInfoCollection.UpdateOneAsync(filter, bilders);
        }
    }
}
