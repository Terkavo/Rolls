using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Rolls.Auxiliary.AntiBruteforce;
using Rolls.Mongo;
using Rolls.Mongo.Users;
using System.IdentityModel.Tokens.Jwt;

namespace Rolls.Controllers.Api;

[ApiController]
[Route("Api/[controller]")]

public class AuthorizationController : ControllerBase
{
    private readonly MyUserServise _Servise;

    public AuthorizationController(MyUserServise servise)
    {
        _Servise=servise;
    }
    [HttpPost]
    public async Task<IActionResult> Index(LoginPassword obj)
    {
        MyUser identity;
        try
        {
            identity =await _Servise.Upload(obj.Login, obj.Password);
        }
        catch
        {
            AntiBruteforceManager.ConsiderAttempt(Request.Headers["X-Real-IP"].ToString());
            return BadRequest(new { errorText = "Invalid username or password." });
        }
        var now = DateTime.UtcNow;
        var jwt = new JwtSecurityToken(
            notBefore: now,
            claims: identity.Claims,
            expires: now.Add(TimeSpan.FromDays(AuthOptions.LIFETIMEDAY)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                SecurityAlgorithms.HmacSha256));
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
        return Ok(AuxiliaryClass.GoodJson(new
        {
            Token = encodedJwt,
            identity.FullAccess,
            identity.CanSetRollIsUsedUp,
        }));
    }
    [HttpGet()]
    [Route("UpdateToken")]
    [Authorize]
    public async Task<IActionResult> UpdateToken()
    {
        MyUser user = null;
        try
        {
            user = await _Servise.UploadByLogin(User.FindFirst(c => c.Type == "Login").Value);
        }
        catch
        {
            return Unauthorized();
        }
        var now = DateTime.UtcNow;
        var jwt = new JwtSecurityToken(
            notBefore: now,
            claims: User.Claims,
            expires: now.Add(TimeSpan.FromDays(AuthOptions.LIFETIMEDAY)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
        return Ok(AuxiliaryClass.GoodJson(new
        {
            Token = encodedJwt,
            user.FullAccess,
            user.CanSetRollIsUsedUp,
        }));
    }
}

public class LoginPassword
{
    public string Login { get; set; }
    public string Password { get; set; }
}
