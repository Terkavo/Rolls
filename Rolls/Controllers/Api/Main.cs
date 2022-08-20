using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rolls.Models.Rolls;
using System;

namespace Rolls.Controllers.Api
{
    [ApiController]
    [Route("Api/[controller]/[action]")]
    [Authorize]
    public class Main : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SaveBatchRolls([FromBody] BatchRolls batchRolls)
        {
            await batchRolls.SaveOnMongo();
            return Ok(new { batchRolls.Id });
        }

        public async Task<IActionResult> GetBatchesOfRolls()
        {
            return Ok(AuxiliaryClass.GoodJson(await BatchRolls.UploadList()));
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

        [HttpGet("{id}/{location}")]
        public async Task<IActionResult> SetRollLocation(string id, string location)
        {
            await BatchRolls.SetRollLocation(id, location);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRolls()
        {

            return Ok(AuxiliaryClass.GoodJson(await BatchRolls.UploadList()));

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> TransferringRollsToWarehouse(string id)
        {
            await BatchRolls.TransferringRollsToWarehouse(id);
            return Ok();
        }

        [HttpGet("{id}/{location}")]
        public async Task<IActionResult> TransferringRollsToOtherPeople(string id, string location)
        {
            await BatchRolls.TransferringRollsToOtherPeople(id, location);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ReportThatRollIsUsedUp(string id)
        {
            await BatchRolls.ReportThatRollIsUsedUp(id);
            return Ok();
        }

    }
}
