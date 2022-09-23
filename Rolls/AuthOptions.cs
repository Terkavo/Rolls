using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Rolls
{
    public class AuthOptions
    {
        static readonly string KEY = Program.ConnectionString;
        public const int LIFETIMEDAY = 14;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
