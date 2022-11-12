using MongoDB.Driver;

namespace Rolls.Mongo.ProdgectInfoFolder
{
    public class ProjectInfoService : Downloadable<ProdgectInfo>
    {
        public ProjectInfoService(MongoService mongoService)
        {
            _Collection=mongoService.ProdgectInfoCollection;
        }
        public async Task OnStart()
        {
            try
            {
                await Upload();
            }
            catch (Exception ex) when (ex.Message=="NotFind")
            {
                ProdgectInfo prodgectInfo = new();
                await _Collection.InsertOneAsync(prodgectInfo);
            }
        }
        public async Task<long> GetAndIncBatchRollsId()
        {
            ProdgectInfo info = await Upload();
            var bilders = Builders<ProdgectInfo>.Update.Inc(x => x.LastBatchRollsId, 1);
            var filter = Builders<ProdgectInfo>.Filter.Empty;
            await _Collection.UpdateOneAsync(filter, bilders);
            return info.LastBatchRollsId+1;
        }
        public async Task<long> GetFirstAndIncRollCounter(uint count)
        {
            ProdgectInfo info = await Upload();
            var bilders = Builders<ProdgectInfo>.Update.Inc(x => x.LastRollId, count);
            var filter = Builders<ProdgectInfo>.Filter.Empty;
            await _Collection.UpdateOneAsync(filter, bilders);
            return info.LastRollId;
        }
    }
}
