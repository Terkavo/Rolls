using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rolls.Models;
using Rolls.Models.Rolls;
using System;

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

        [HttpGet]
        public async Task<IActionResult> GetBatchesOfRolls()
        {
            var list = await BatchRolls.UploadList();
            list.Reverse();
            return Ok(AuxiliaryClass.GoodJson(list));
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
            await BatchRolls.SetRollLocation(id, location);
            return Ok();
        }

        [Authorize(Policy = "FullAccess")]
        [HttpGet("{id}")]
        public async Task<IActionResult> TransferringRollsToWarehouse(string id)
        {
            await BatchRolls.TransferringRollsToWarehouse(id,login);
            return Ok();
        }

        [Authorize(Policy = "FullAccess")]
        [HttpGet("{id}/{location}")]
        public async Task<IActionResult> TransferringRollsToCounterparty(string id, string location)
        {
            await BatchRolls.TransferringRollsToCounterparty(id, location,login);
            return Ok();
        }
        [Authorize(Policy = "CanSetRollIsUsedUp")]
        [HttpGet("{id}")]
        public async Task<IActionResult> ReportThatRollIsUsedUp(string id)
        {
            await BatchRolls.ReportThatRollIsUsedUp(id,login);
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
