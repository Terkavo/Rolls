using Microsoft.AspNetCore.Mvc;

namespace Rolls.Auxiliary.AntiBruteforce
{
    public class AntiBruteforceMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<Program> _logger;

        public AntiBruteforceMiddleware(RequestDelegate next, ILogger<Program> logger)
        {
            this.next = next;
            _logger=logger;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            var ip = context.Request.Headers["X-Real-IP"].ToString();
            _logger.LogInformation(ip);
            if (AntiBruteforceManager.IsAllowedToProvideContent(ip))
                await next.Invoke(context);
            else
                context.Response.StatusCode = 500;
        }
    }
}
