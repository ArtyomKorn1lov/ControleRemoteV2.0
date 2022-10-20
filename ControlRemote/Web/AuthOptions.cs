using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Web
{
    public class AuthOptions
    {
        public const string ISSUER = "ControlServer";
        public const string AUDIENCE = "ControlClient";
        const string KEY = "ControlKeyMyApp1230987!";
        public const int LIFETIME = 1;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
