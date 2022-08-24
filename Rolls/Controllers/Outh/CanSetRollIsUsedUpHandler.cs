using Microsoft.AspNetCore.Authorization;
using Rolls.Mongo;

namespace Rolls.Controllers.Outh;

public class CanSetRollIsUsedUpHandler : AuthorizationHandler<CanSetRollIsUsedUpPlug>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, CanSetRollIsUsedUpPlug requirement)
    {
        MyUser user = await MyUser.UploadByLogin(context.User.FindFirst(c => c.Type == "Login").Value);
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
