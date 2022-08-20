using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Rolls
{
    public class AuthOptions
    {
        const string KEY = "Развивайся либо сдохни как ГКЧП";  
        public const int LIFETIMEDAY = 14; 
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
