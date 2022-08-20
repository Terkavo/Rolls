using Rolls.Auxiliary;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Diagnostics;

namespace Rolls.Mongo
{
    abstract public class Downloadable<T>
    {
        public static IMongoCollection<T> Collection;
        internal static async Task<List<T>> UploadList()
        {
            List<T> packs = await UploadList(new BsonDocument());
            return packs;
        }
        internal static async Task<List<T>> UploadList(BsonDocument bson)
        {
            FilterDefinition<T> filter = bson;
            return await UploadList(filter);
        }

        internal static async Task<List<T>> UploadList(FilterDefinition<T> bson)
        {
            var res = await Collection.FindAsync<T>(bson);
            return res.ToList();
        }
        internal static async Task<T> Upload(FilterDefinition<T> bson)
        {
            List<T> packs = await UploadList(bson);
            if (packs.Count == 0)
                throw new Exception("NotFind");
            return packs[0];
        }
        internal static async Task<T> Upload(BsonDocument bson)
        {
            FilterDefinition<T> filter = bson;
            return await Upload(filter);
        }
        internal static async Task<T> Upload(string id)
        {
            return await Upload(new BsonDocument("_id", id));
        }
        internal static async Task<T> Upload()
        {
            return await Upload(new BsonDocument());
        }
    }
}
