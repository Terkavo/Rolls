namespace Rolls.Auxiliary
{
    public static class AuxiliaryDataTime
    {
        public static ulong JsData(this DateTime data)
        {
            return (ulong)data
               .Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc))
               .TotalMilliseconds;
        }
        
    }
}
