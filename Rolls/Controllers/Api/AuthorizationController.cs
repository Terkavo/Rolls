using Rolls.Auxiliary.AntiBruteforce;
using Rolls.Mongo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;


namespace Rolls.Controllers.Api
{
    [ApiController]
    [Route("Api/[controller]")]

    public class AuthorizationController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Index(LoginPassword obj)
        {
            MyUser identity;
            try
            {
                identity =await MyUser.Upload(obj.Login, obj.Password);
            }
            catch
            {
                AntiBruteforceManager.ConsiderAttempt(Request.HttpContext.Connection.LocalIpAddress.ToString());
                return BadRequest(new { errorText = "Invalid username or password." });
            }
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromDays(AuthOptions.LIFETIMEDAY)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
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
            MyUser user = await MyUser.UploadByLogin(User.FindFirst(c => c.Type == "Login").Value);
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
}
