using DnsClient;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rolls.Models.Rolls;

namespace Rolls.Controllers.Api;
[ApiController]
[Route("Api/[controller]/[action]")]
[Authorize]
public class RollsController : ControllerBase
{
    private string _Login
    {
        get
        {
            return User.FindFirst(c => c.Type == "Login").Value;
        }
    }
    private readonly BatchRollsService _BatchRollsService;

    public RollsController(BatchRollsService batchRollsService)
    {
        _BatchRollsService=batchRollsService;
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        try
        {
            return Ok(AuxiliaryClass.GoodJson(await _BatchRollsService.GetRoll(id)));
        }
        catch (Exception ex) when (ex.Message=="NotFind")
        {
            return NotFound();
        }
    }

    [Authorize(Policy = "FullAccess")]
    [HttpGet("{id}/{location}")]
    public async Task<IActionResult> SetLocation(string id, string location)
    {
        await _BatchRollsService.SetRollLocation(id, location, _Login);
        return Ok();
    }

    [Authorize(Policy = "CanSetRollIsUsedUp")]
    [HttpGet("{id}")]
    public async Task<IActionResult> TransferringToWarehouse(string id)
    {
        await _BatchRollsService.TransferringRollsToWarehouse(id, _Login);
        return Ok();
    }

    [Authorize(Policy = "FullAccess")]
    [HttpGet("{id}/{location}")]
    public async Task<IActionResult> TransferringToCounterparty(string id, string location)
    {
        await _BatchRollsService.TransferringRollsToCounterparty(id, location, _Login);
        return Ok();
    }
    [Authorize(Policy = "CanSetRollIsUsedUp")]
    [HttpGet("{id}")]
    public async Task<IActionResult> SetUsedUpTrue(string id)
    {
        await _BatchRollsService.ReportThatRollIsUsedUp(id, _Login);
        return Ok();
    }
    [Authorize(Policy = "CanSetRollIsUsedUp")]
    [HttpGet("{id}/{value}")]
    public async Task<IActionResult> SetQuantity(string id, string value)
    {
        await _BatchRollsService.SetRollQuantity(id, value, _Login);
        return Ok();
    }
}
