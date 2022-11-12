using MongoDB.Bson.Serialization;
using Rolls.Models;
using Rolls.Mongo;
using Rolls.Mongo.ProdgectInfoFolder;

namespace Rolls
{
    public class OnStart : IHostedService
    {
        private readonly CounterpartiesService _CounterpartiesService;
        private readonly ProjectInfoService _ProjectInfoService;

        public OnStart(CounterpartiesService counterpartiesService, ProjectInfoService projectInfoService)
        {
            _CounterpartiesService=counterpartiesService;
            _ProjectInfoService=projectInfoService;
        }
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            BsonSerializer.RegisterSerializer(typeof(DateTime), new MyMongoDBDateTimeSerializer());
            Task t1 = _ProjectInfoService.OnStart();
            await _CounterpartiesService.OnStartAsync();
            await t1;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
