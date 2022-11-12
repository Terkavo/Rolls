using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Rolls.Mongo.ProdgectInfoFolder
{
    public class ProdgectInfo
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public long LastBatchRollsId;
        public long LastRollId;
    }
}
