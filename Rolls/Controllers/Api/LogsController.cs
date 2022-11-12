using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rolls.Models.LogsFolder;

namespace Rolls.Controllers.Api;

[ApiController]
[Route("Api/[controller]/[action]")]
[Authorize]
public class LogsController : ControllerBase
{
    private readonly LogsService _LogsService;

    public LogsController(LogsService logsService)
    {
        _LogsService=logsService;
    }
    [HttpGet()]
    public async Task<IActionResult> Get()
    {
        return Ok(AuxiliaryClass.GoodJson(await _LogsService.UploadList(100)));
    }
}
