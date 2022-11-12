using Rolls.Mongo;

namespace Rolls.Models.LogsFolder
{
    public class LogsService : Downloadable<LogElement>
    {
        public LogsService(MongoService mongo)
        {
            _Collection=mongo.LogsCollection;
        }
        public async Task Create(string parentId, string name, string executorLogin, string text)
        {
            LogElement element = new(parentId, name, executorLogin, text);
            await _Collection.InsertOneAsync(element);
        }
    }
}
