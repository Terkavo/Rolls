using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rolls.Models;

namespace Rolls.Controllers.Api;
[ApiController]
[Route("Api/[controller]/[action]")]
[Authorize]
public class CounterpartiesController : ControllerBase
{
    private readonly CounterpartiesService _CounterpartiesService;

    public string _Login
    {
        get
        {
            return User.FindFirst(c => c.Type == "Login").Value;
        }
    }
    public CounterpartiesController(CounterpartiesService counterpartiesService)
    {
        _CounterpartiesService=counterpartiesService;
    }
    [Authorize(Policy = "FullAccess")]
    [HttpGet("{type}/{title}")]
    public async Task<IActionResult> Add(string type, string title)
    {
        await _CounterpartiesService.Add(type, title);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(AuxiliaryClass.GoodJson(await _CounterpartiesService.GetAllCounterparties()));
    }

    [HttpGet("{type}")]
    public async Task<IActionResult> GetOneType(string type)
    {
        return Ok(AuxiliaryClass.GoodJson(await _CounterpartiesService.GetCounterparty(type)));
    }
}
