using MongoDB.Driver;
using Rolls.Models.LogsFolder;
using Rolls.Mongo;
using Rolls.Mongo.ProdgectInfoFolder;
using System.Drawing;
using System.Web.Razor.Parser.SyntaxTree;
using System.Xml.Linq;

namespace Rolls.Models.Rolls
{
    public class BatchRollsService : Downloadable<BatchRolls>
    {
        private readonly LogsService _LogsService;
        private readonly ProjectInfoService _ProdgectInfoService;

        public BatchRollsService(MongoService mongo, LogsService logsService, ProjectInfoService prodgectInfoService)
        {
            _Collection=mongo.BatchRollsCollection;
            _LogsService=logsService;
            _ProdgectInfoService=prodgectInfoService;
        }
        public async Task SaveOnMongo(BatchRolls batch, string userLogin)
        {
            batch.DateOfCreation=DateTime.Now;
            batch.Id ="B-"+await _ProdgectInfoService.GetAndIncBatchRollsId();
            long RoolsCouint = await _ProdgectInfoService.GetFirstAndIncRollCounter((uint)batch.Rolls.Count);
            for (int i = 0; i<batch.Rolls.Count; i++)
                batch.Rolls[i].Id="R-"+(i+RoolsCouint);
            _= CrateLogOnCrate(batch, userLogin);
            await _Collection.InsertOneAsync(batch);
        }

        private async Task CrateLogOnCrate(BatchRolls batch, string userLogin)
        {
            string rollsId = "";
            foreach (var item in batch.Rolls)
                rollsId+=item.Id+",";
            await _LogsService.Create(batch.Id, "OnCrateBatch", userLogin, $"Создана Пачка со следующими рулонами{rollsId}");
        }
        internal async Task UpdateBatchOfRolls(BatchRolls batch, string login)
        {
            var filter = Builders<BatchRolls>.Filter.Eq(c => c.Id, batch.Id);
            _= CrateLogOnUpdate(batch, login);
            var update = Builders<BatchRolls>.Update.
                Set(c => c.DateArrival, batch.DateArrival).
                Set(c => c.Provider, batch.Provider).
                Set(c => c.Color, batch.Color).
                Set(c => c.Material, batch.Material).
                Set(c => c.Comment, batch.Comment);
            await _Collection.UpdateOneAsync(filter, update);
        }
        private async Task CrateLogOnUpdate(BatchRolls batch, string userLogin)
        {
            BatchRolls batchMongo = await Upload(batch.Id);
            string text = $"Обнавлена пачка:{batch.Id}\n";
            if (batchMongo.DateArrival!=batch.DateArrival)
                text+=$"Дата прихода:{batchMongo.DateArrival}=>{batch.DateArrival}\n";
            if (batchMongo.Provider!=batch.Provider)
                text+=$"Поставщик:{batchMongo.Provider}=>{batch.Provider}\n";
            if (batchMongo.Color!=batch.Color)
                text+=$"Цвет:{batchMongo.Color}=>{batch.Color}\n";
            if (batchMongo.Material!=batch.Material)
                text+=$"Материал:{batchMongo.Material}=>{batch.Material}\n";
            if (batchMongo.Comment != batch.Comment)
                text += $"Коментарий:{batchMongo.Comment}=>{batch.Comment}\n";
            text= text.Trim('\n');
            await _LogsService.Create(batch.Id, "OnUpdateBatch", userLogin, text);
        }
        internal async Task<BatchRolls> GetRoll(string id)
        {
            var bilder = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, x => x.Id == id);
            BatchRolls res = await Upload(bilder);
            res.Rolls.RemoveAll(x => x.Id!=id);
            return res;
        }

        internal async Task SetRollLocation(string id, string location, string login)
        {
            await _LogsService.Create(id, "OnUpdateBatch", login, $"Размещен на складе:{location}");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].CellInWarehouse, location);
            await _Collection.UpdateOneAsync(filter, update);
        }

        internal async Task TransferringRollsToCounterparty(string id, string location, string userLogin)
        {
            await _LogsService.Create(id, "TransferringRollsToCounterparty", userLogin, $"Перенесено контрагенту:{location}");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].CounterpartyOwner, location)
                .Set(c => c.Rolls[-1].AtCounterpartiesWith, DateTime.Now);
            await _Collection.UpdateOneAsync(filter, update);
        }

        internal async Task TransferringRollsToWarehouse(string id, string userLogin)
        {
            await _LogsService.Create(id, "TransferringRollsToWarehouse", userLogin, "Перенесен в цех");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].IsInWorkshop, true)
                .Set(c => c.Rolls[-1].InTheWorkshopWith, DateTime.Now);
            await _Collection.UpdateOneAsync(filter, update);
        }

        internal async Task ReportThatRollIsUsedUp(string id, string userLogin)
        {
            await _LogsService.Create(id, "ReportThatRollIsUsedUp", userLogin, "Рулон Израходован");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].IsUsedUp, true)
                .Set(c => c.Rolls[-1].UsedUpWith, DateTime.Now);
            await _Collection.UpdateOneAsync(filter, update);
        }

        internal async Task SetRollQuantity(string id, string value, string userLogin)
        {
            await _LogsService.Create(id, "SetRollQuantity", userLogin, $"\"Количество в упаковке\" рулона измененно:{value}");
            var filter = Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, p => p.Id == id);
            var update = Builders<BatchRolls>.Update
                .Set(c => c.Rolls[-1].Quantity, value);
            await _Collection.UpdateOneAsync(filter, update);
        }
    }
}
