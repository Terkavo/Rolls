using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Security.Claims;

namespace Rolls.Mongo
{
    public class MyUser
    {
        [BsonId]
        public BsonObjectId Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public bool FullAccess { get; set; }
        public bool CanSetRollIsUsedUp { get; set; }
        internal List<Claim> Claims
        {
            get
            {
                return new List<Claim>() { new Claim("Login", Login) };
            }
        }

    }
}