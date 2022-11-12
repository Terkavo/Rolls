using MongoDB.Bson;
using MongoDB.Driver;

namespace Rolls.Mongo;

abstract public class Downloadable<T>
{
    protected IMongoCollection<T> _Collection;
    internal async Task<List<T>> UploadList()
    {
        List<T> packs = await UploadList(new BsonDocument());
        return packs;
    }
    internal Task<List<T>> UploadList(BsonDocument bson)
    {
        FilterDefinition<T> filter = bson;
        return UploadList(filter, null);
    }
    internal Task<List<T>> UploadList(FilterDefinition<T> filter)
    {
        return UploadList(filter, null);
    }
    internal Task<List<T>> UploadList(FilterDefinition<T> filter, int? limit)
    {
        return _Collection.Find(filter).Limit(limit).ToListAsync();
    }
    internal async Task<List<T>> UploadList(int quantity)
    {
        var res = _Collection.Find(new BsonDocument()).Limit(quantity).Sort("{$natural: -1}");
        return await res.ToListAsync();
    }
    internal async Task<T> Upload(FilterDefinition<T> bson)
    {
        List<T> packs = await UploadList(bson, null);
        if (packs.Count == 0)
            throw new Exception("NotFind");
        return packs[0];
    }
    internal async Task<T> Upload(BsonDocument bson)
    {
        FilterDefinition<T> filter = bson;
        return await Upload(filter);
    }
    internal async Task<T> Upload(string id)
    {
        return await Upload(new BsonDocument("_id", id));
    }
    internal async Task<T> Upload()
    {
        return await Upload(new BsonDocument());
    }
}
