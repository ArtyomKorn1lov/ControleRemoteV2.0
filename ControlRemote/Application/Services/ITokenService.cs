using System.Collections.Generic;
using System.Security.Claims;

namespace Application.Services
{
    public interface ITokenService
    {
        public string GenerateAccessToken(IEnumerable<Claim> claims);
        public string GenerateRefreshToken();
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
