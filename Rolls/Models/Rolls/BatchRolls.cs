using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Rolls.Mongo;
using System.Text.Json.Serialization;

namespace Rolls.Models.Rolls
{
    public class BatchRolls 
    {
        [BsonId]
        public string Id { get; set; }
        [BsonElement]
        public string DateArrival
        {
            set
            {
                if (!DateOnly.TryParse(value, out DateOnly date))
                    if (!DateOnly.TryParseExact(value, "dd.MM.yyyy", out date))
                        date= DateOnly.ParseExact(value[..10], "yyyy-MM-dd");
                dateArrival=date;
            }
            get
            {
                return dateArrival.ToString("dd.MM.yyyy");
            }
        }
        [JsonIgnore]
        private DateOnly dateArrival { get; set; }
        [JsonIgnore]
        public DateTime DateOfCreation { get; set; }
        [JsonPropertyName("DateOfCreation")]
        public DateTime JsonDateOfCreation
        {
            get
            {
                return DateOfCreation;
            }
        }
        public string Provider { get; set; }

        public string Color { get; set; }
        public string Material { get; set; }
        public string Comment { get; set; }
        public List<Roll> Rolls { get; set; }
    }
}
