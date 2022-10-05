using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Rolls.Mongo;
using System.Text.Json.Serialization;

namespace Rolls.Models.Rolls
{
    public class BatchRolls : Downloadable<BatchRolls>
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
        public async Task SaveOnMongo(string userLogin)
        {
            DateOfCreation=DateTime.Now;
            ProdgectInfo prodgectInfo = await ProdgectInfo.AsyncConstructor();
            Id ="B-"+prodgectInfo.LastBatchRollsId;
            uint RoolsCouint = prodgectInfo.LastRollId;
            _=prodgectInfo.IncRollCounter((uint)Rolls.Count);
            for (int i = 0; i<Rolls.Count; i++)
                Rolls[i].Id="R-"+(i+RoolsCouint);
            _= CrateLogOnCrate(userLogin);
            await Collection.InsertOneAsync(this);
        }

        private async Task CrateLogOnCrate(string userLogin)
        {
            string rollsId = "";
            foreach (var item in Rolls)
                rollsId+=item.Id+",";
            await LogElement.AsyncConstructor(Id, "OnCrateBatch", userLogin, $"Создана Пачка со следующими рулонами{rollsId}");
        }
        internal async Task UpdateBatchOfRolls(string login)
        {
            var filter = Builders<BatchRolls>.Filter.Eq(c => c.Id, Id);
            _= CrateLogOnUpdate(login);
            var update = Builders<BatchRolls>.Update.
                Set(c => c.DateArrival, DateArrival).
                Set(c => c.Provider, Provider).
                Set(c => c.Color, Color).
                Set(c => c.Material, Material).
                Set(c => c.Comment, Comment);
            await Collection.UpdateOneAsync(filter, update);
        }
        private async Task CrateLogOnUpdate(string userLogin)
        {
            BatchRolls batchMongo = await Upload(Id);
            string text = $"Обнавлена пачка:{Id}\n";
            if (batchMongo.DateArrival!=DateArrival)
                text+=$"Дата прихода:{batchMongo.DateArrival}=>{DateArrival}\n";
            if (batchMongo.Provider!=Provider)
                text+=$"Поставщик:{batchMongo.Provider}=>{Provider}\n";
            if (batchMongo.Color!=Color)
                text+=$"Цвет:{batchMongo.Color}=>{Color}\n";
            if (batchMongo.Material!=Material)
                text+=$"Материал:{batchMongo.Material}=>{Material}\n";
            if (batchMongo.Comment!=Comment)
                text+=$"Коментарий:{batchMongo.Comment}=>{Comment}\n";
            text= text.Trim('\n');
            await LogElement.AsyncConstructor(Id, "OnUpdateBatch", userLogin, text);
        }
        internal static async Task<BatchRolls> GetRoll(string id)
        {
            var bilder = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, x => x.Id == id);
            BatchRolls res = await Upload(bilder);
            res.Rolls.RemoveAll(x => x.Id!=id);
            return res;
        }

        internal static async Task SetRollLocation(string id, string location, string login)
        {
            await LogElement.AsyncConstructor(id, "OnUpdateBatch", login, $"Размещен на складе:{location}");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].CellInWarehouse, location);
            await Collection.UpdateOneAsync(filter, update);
        }

        internal static async Task TransferringRollsToCounterparty(string id, string location, string userLogin)
        {
            await LogElement.AsyncConstructor(id, "TransferringRollsToCounterparty", userLogin, $"Перенесено контрагенту:{location}");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].CounterpartyOwner, location)
                .Set(c => c.Rolls[-1].AtCounterpartiesWith, DateTime.Now);
            await Collection.UpdateOneAsync(filter, update);
        }

        internal static async Task TransferringRollsToWarehouse(string id, string userLogin)
        {
            await LogElement.AsyncConstructor(id, "TransferringRollsToWarehouse", userLogin, "Перенесен в цех");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].IsInWorkshop, true)
                .Set(c => c.Rolls[-1].InTheWorkshopWith, DateTime.Now);
            await Collection.UpdateOneAsync(filter, update);
        }

        internal static async Task ReportThatRollIsUsedUp(string id, string userLogin)
        {
            await LogElement.AsyncConstructor(id, "ReportThatRollIsUsedUp", userLogin, "Рулон Израходован");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].IsUsedUp, true)
                .Set(c => c.Rolls[-1].UsedUpWith, DateTime.Now);
            await Collection.UpdateOneAsync(filter, update);
        }

        internal static async Task SetRollQuantity(string id, string value, string userLogin)
        {
            await LogElement.AsyncConstructor(id, "SetRollQuantity", userLogin, $"\"Количество в упаковке\" рулона измененно:{value}");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].Quantity, value);
            await Collection.UpdateOneAsync(filter, update);
        }
    }
}
