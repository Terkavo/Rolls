using Microsoft.AspNetCore.Authorization;
using Rolls.Mongo;

namespace Rolls.Controllers.Outh;
public class FullAccessHandler : AuthorizationHandler<FullAccessPlug>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, FullAccessPlug requirement)
    {
        MyUser user = await MyUser.UploadByLogin(context.User.FindFirst(c => c.Type == "Login").Value);
        if (user.FullAccess)
            context.Succeed(requirement);
        else
            context.Fail();
    }
}
public class FullAccessPlug : IAuthorizationRequirement
{ }
