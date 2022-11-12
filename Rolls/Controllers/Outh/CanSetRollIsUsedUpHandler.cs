using Microsoft.AspNetCore.Authorization;
using Rolls.Mongo;
using Rolls.Mongo.Users;

namespace Rolls.Controllers.Outh;

public class CanSetRollIsUsedUpHandler : AuthorizationHandler<CanSetRollIsUsedUpPlug>
{
    private readonly MyUserServise _Servise;

    public CanSetRollIsUsedUpHandler(MyUserServise servise)
    {
        _Servise=servise;
    }
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, CanSetRollIsUsedUpPlug requirement)
    {
        MyUser user = await _Servise.UploadByLogin(context.User.FindFirst(c => c.Type == "Login").Value);
        if (user.FullAccess)
            context.Succeed(requirement);
        else if (user.CanSetRollIsUsedUp)
            context.Succeed(requirement);
        else
            context.Fail();
    }
}
public class CanSetRollIsUsedUpPlug : IAuthorizationRequirement
{ }
