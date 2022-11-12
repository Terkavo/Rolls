using Microsoft.AspNetCore.Authorization;
using Rolls.Mongo;
using Rolls.Mongo.Users;

namespace Rolls.Controllers.Outh;
public class FullAccessHandler : AuthorizationHandler<FullAccessPlug>
{
    private readonly MyUserServise _Servise;

    public FullAccessHandler(MyUserServise servise)
    {
        _Servise=servise;
    }
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, FullAccessPlug requirement)
    {
        MyUser user = await _Servise.UploadByLogin(context.User.FindFirst(c => c.Type == "Login").Value);
        if (user.FullAccess)
            context.Succeed(requirement);
        else
            context.Fail();
    }
}
public class FullAccessPlug : IAuthorizationRequirement
{ }
