namespace Rolls.Auxiliary.AntiBruteforce
{
    public class AntiBruteforceMiddleware
    {
        private readonly RequestDelegate next;
        public AntiBruteforceMiddleware(RequestDelegate next)
        {
            this.next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            var ip = context.Request.HttpContext.Connection.RemoteIpAddress.ToString();
            if (AntiBruteforceManager.IsAllowedToProvideContent(ip))
                await next.Invoke(context);
            else
                context.Abort();
        }
    }
}
