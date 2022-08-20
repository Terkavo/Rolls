namespace Rolls.Auxiliary.AntiBruteforce
{
    static public class AntiBruteforceManager
    {
        private static List<IpCounter> counters = new();
        private const uint maximuNumberOfRequests = 5;
        internal static bool IsAllowedToProvideContent(string ip)
        {
            IpCounter ipCounter = counters.Find(x => x.Ip == ip);
            if (ipCounter == null)
                return true;
            if (ipCounter.Counter>=maximuNumberOfRequests)
                return false;
            return true;
        }
        internal static void ConsiderAttempt(string ip)
        {
            IpCounter ipCounter = counters.Find(x => x.Ip == ip);
            if (ipCounter!=null)
                ipCounter.Counter++;
            else
                counters.Add(new IpCounter(ip));
        }
    }
}
