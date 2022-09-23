using MongoDB.Bson;
using Rolls.Mongo;
using System.Text.Json.Serialization;

namespace Rolls.Models
{
    public class LogElement : Downloadable<LogElement>
    {
        [JsonIgnore]
        public ObjectId Id { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public string ExecutorLogin { get; set; }
        public string Text { get; set; }
        public DateTime Time { get; set; } = DateTime.Now;

        private LogElement(string parentId,string name, string executorLogin, string text)
        {
            ParentId=parentId;
            Name=name;
            ExecutorLogin =executorLogin;
            Text=text;
        }

        internal static async Task AsyncConstructor(string parentId, string name, string executorLogin, string text)
        {
            LogElement element = new(parentId, name, executorLogin, text);
            await Collection.InsertOneAsync(element);
        }

       
    }
}
