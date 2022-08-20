namespace Rolls.Auxiliary.AntiBruteforce
{
    public class IpCounter
    {
        public string Ip;
        public uint Counter = 1;

        public IpCounter(string ip)
        {
            Ip=ip;
        }
    }
}
