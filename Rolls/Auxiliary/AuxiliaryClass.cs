using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System.Text.Json;

namespace Rolls.Auxiliary
{
    static public class AuxiliaryClass
    {
        public static string GoodJson(object value)
        {
            JsonSerializerOptions options = new()
            {
                Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                WriteIndented = true
            };
            string ret= JsonSerializer.Serialize(value, options);
            return ret;
        }
        public static DateTime FromJsData(ulong data)
        {
            return new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).Add(TimeSpan.FromMinutes(data));
        }
    }

}
