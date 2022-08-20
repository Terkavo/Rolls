using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Rolls.Mongo;
using System;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace Rolls.Models.Rolls
{
    public class BatchRolls : Downloadable<BatchRolls>
    {
        [BsonId]
        public string Id { get; set; }
        [BsonElement]
        [DebuggerNonUserCode]
        public string DateArrival
        {
            set
            {
                if (!DateOnly.TryParse(value, out DateOnly date))
                    if (!DateOnly.TryParseExact(value[..10], "yyyy-mm-dd", out date))
                        if (!DateOnly.TryParseExact(value, "dd/mm/yyyy", out date))
                            date= DateOnly.ParseExact(value, "dd.mm.yyyy");
                dateArrival=date;
            }
            get
            {
                return dateArrival.ToString();
            }
        }
        private DateOnly dateArrival { get; set; }
        public DateTime DateOfCreation { get; set; }
        public string Provider { get; set; }
        public string Name { get; set; }
        public string Collor { get; set; }
        public string Comment { get; set; }
        public List<Roll> Rolls { get; set; }
        public async Task SaveOnMongo()
        {
            DateOfCreation=DateTime.Now;
            ProdgectInfo prodgectInfo = await ProdgectInfo.AsyncConstructor();
            Id ="B-"+prodgectInfo.LastBatchRollsId;
            uint RoolsCouint = prodgectInfo.LastRollId;
            _=prodgectInfo.IncRollCounter((uint)Rolls.Count);
            for (int i = 0; i<Rolls.Count; i++)
                Rolls[i].Id="R-"+(i+RoolsCouint);
            await Collection.InsertOneAsync(this);
        }
        internal static async Task<BatchRolls> GetRoll(string id)
        {
            var bilder = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, x => x.Id == id);
            BatchRolls res = await Upload(bilder);
            res.Rolls.RemoveAll(x => x.Id!=id);
            return res;
        }

        internal static async Task SetRollLocation(string id, string location)
        {
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].Location, location);
            await Collection.UpdateOneAsync(filter, update);
        }

        internal static async Task TransferringRollsToOtherPeople(string id, string location)
        {
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].CounterpartyOwner, location);
            await Collection.UpdateOneAsync(filter, update);
        }

        internal static async Task TransferringRollsToWarehouse(string id)
        {
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].IsInWorkshop, true);
            await Collection.UpdateOneAsync(filter, update);
        }

        internal static async Task ReportThatRollIsUsedUp(string id)
        {
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].IsUsedUp, true);
            await Collection.UpdateOneAsync(filter, update);
        }
    }
}
