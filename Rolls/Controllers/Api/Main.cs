using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Rolls.Models;
using Rolls.Models.Rolls;

namespace Rolls.Controllers.Api
{
    [ApiController]
    [Route("Api/[controller]/[action]")]
    [Authorize]
    public class Main : ControllerBase
    {

        public string login
        {
            get
            {
                return User.FindFirst(c => c.Type == "Login").Value;
            }
        }

        [Authorize(Policy = "FullAccess")]
        [HttpPost]
        public async Task<IActionResult> SaveBatchRolls([FromBody] BatchRolls batchRolls)
        {
            await batchRolls.SaveOnMongo(login);
            return Ok(new { batchRolls.Id });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBatchOfRolls(string id)
        {
            return Ok(AuxiliaryClass.GoodJson(await BatchRolls.Upload(id)));
        }

        [HttpGet]
        public async Task<IActionResult> GetBatchesOfRolls(bool IsAtCounterparties, bool IsGetUsedUp)
        {
            List<FilterDefinition<BatchRolls>> list = new();
            if (!IsAtCounterparties)
                list.Add(Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, y => y.CounterpartyOwner==null));
            if (!IsGetUsedUp)
                list.Add(Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, y => !y.IsUsedUp));
            FilterDefinition<BatchRolls> filter = Builders<BatchRolls>.Filter.And(list);
            List<BatchRolls> listRes = null;
            if (list.Count!=0)
                listRes = await BatchRolls.UploadList(filter);
            else
                listRes = await BatchRolls.UploadList(new BsonDocument());
            listRes.Reverse();
            return Ok(AuxiliaryClass.GoodJson(listRes));
        }

        [HttpGet("{value}")]
        public async Task<IActionResult> GetBatchesOfRollsOnly(string value)
        {
            FilterDefinition<BatchRolls> filter;
            if (value=="AtCounterparties")
                filter= Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, y => y.CounterpartyOwner!=null);
            else
                filter= Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, y => y.IsUsedUp);
            List<BatchRolls> listRes = await BatchRolls.UploadList(filter);
            return Ok(AuxiliaryClass.GoodJson(listRes));
        }

        [HttpPost]
        [Authorize(Policy = "FullAccess")]
        public async Task<IActionResult> UpdateBatchOfRolls([FromBody] BatchRolls batchRolls)
        {
            await batchRolls.UpdateBatchOfRolls(login);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoll(string id)
        {
            try
            {
                return Ok(AuxiliaryClass.GoodJson(await BatchRolls.GetRoll(id)));
            }
            catch (Exception ex) when (ex.Message=="NotFind")
            {
                return NotFound();
            }
        }

        [Authorize(Policy = "FullAccess")]
        [HttpGet("{id}/{location}")]
        public async Task<IActionResult> SetRollLocation(string id, string location)
        {
            await BatchRolls.SetRollLocation(id, location, login);
            return Ok();
        }

        [Authorize(Policy = "CanSetRollIsUsedUp")]
        [HttpGet("{id}")]
        public async Task<IActionResult> TransferringRollsToWarehouse(string id)
        {
            await BatchRolls.TransferringRollsToWarehouse(id, login);
            return Ok();
        }

        [Authorize(Policy = "FullAccess")]
        [HttpGet("{id}/{location}")]
        public async Task<IActionResult> TransferringRollsToCounterparty(string id, string location)
        {
            await BatchRolls.TransferringRollsToCounterparty(id, location, login);
            return Ok();
        }
        [Authorize(Policy = "CanSetRollIsUsedUp")]
        [HttpGet("{id}")]
        public async Task<IActionResult> ReportThatRollIsUsedUp(string id)
        {
            await BatchRolls.ReportThatRollIsUsedUp(id, login);
            return Ok();
        }

        [Authorize(Policy = "FullAccess")]
        [HttpGet("{type}/{title}")]
        public async Task<IActionResult> AddCounterparty(string type, string title)
        {
            await Counterparties.AddCounterparty(type, title);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetCounterparties()
        {
            return Ok(AuxiliaryClass.GoodJson(await Counterparties.GetAllCounterparties()));
        }

        [HttpGet("{type}")]
        public async Task<IActionResult> GetCounterparty(string type)
        {
            return Ok(AuxiliaryClass.GoodJson(await Counterparties.GetCounterparty(type)));
        }
        [HttpGet()]
        public async Task<IActionResult> GetLogs()
        {
            return Ok(AuxiliaryClass.GoodJson(await LogElement.UploadList(100)));
        }
    }
}
