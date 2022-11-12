using MongoDB.Bson.Serialization.Attributes;
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

    }
}
