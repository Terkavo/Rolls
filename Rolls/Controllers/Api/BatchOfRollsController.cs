using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Rolls.Models.Rolls;

namespace Rolls.Controllers.Api;

[ApiController]
[Route("Api/[controller]/[action]")]
[Authorize]

public class BatchOfRollsController : ControllerBase
{
    private readonly BatchRollsService _BatchRollsService;
    private string _Login
    {
        get
        {
            return User.FindFirst(c => c.Type == "Login").Value;
        }
    }
    public BatchOfRollsController(BatchRollsService batchService)
    {
        _BatchRollsService=batchService;
    }
    [Authorize(Policy = "FullAccess")]
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] BatchRolls batchRolls)
    {
        await _BatchRollsService.SaveOnMongo(batchRolls, _Login);
        return Ok(new { batchRolls.Id });
    }
    [HttpPost]
    [Authorize(Policy = "FullAccess")]
    public async Task<IActionResult> Update([FromBody] BatchRolls batchRolls)
    {
        await _BatchRollsService.UpdateBatchOfRolls(batchRolls, _Login);
        return Ok();
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOne(string id)
    {
        return Ok(AuxiliaryClass.GoodJson(await _BatchRollsService.Upload(id)));
    }

    [HttpGet]
    public async Task<IActionResult> GetMany(bool IsAtCounterparties, bool IsGetUsedUp)
    {
        List<FilterDefinition<BatchRolls>> list = new();
        if (!IsAtCounterparties)
            list.Add(Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, y => y.CounterpartyOwner==null));
        if (!IsGetUsedUp)
            list.Add(Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, y => !y.IsUsedUp));
        FilterDefinition<BatchRolls> filter = Builders<BatchRolls>.Filter.And(list);
        List<BatchRolls> listRes = null;
        if (list.Count!=0)
            listRes = await _BatchRollsService.UploadList(filter);
        else
            listRes = await _BatchRollsService.UploadList();
        listRes.Reverse();
        return Ok(AuxiliaryClass.GoodJson(listRes));
    }

    [HttpGet("{type}")]
    public async Task<IActionResult> GetOnlyOneType(string type)
    {
        FilterDefinition<BatchRolls> filter;
        if (type=="AtCounterparties")
            filter= Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, y => y.CounterpartyOwner!=null);
        else
            filter= Builders<BatchRolls>.Filter.ElemMatch(x => x.Rolls, y => y.IsUsedUp);
        List<BatchRolls> listRes = await _BatchRollsService.UploadList(filter);
        return Ok(AuxiliaryClass.GoodJson(listRes));
    }
}
