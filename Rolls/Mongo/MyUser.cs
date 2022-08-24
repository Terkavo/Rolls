using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System.Security.Claims;

namespace Rolls.Mongo
{
    public class MyUser : Downloadable<MyUser>
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
        public static async Task<MyUser> UploadByLogin(string login)
        {
            var filter = new BsonDocument("Login", login);
            MyUser user = await Upload(filter);
            return user;
        }
        public static async Task<MyUser> Upload(string login, string password)
        {
            var filter = new BsonDocument("$and",
                new BsonArray{
                new BsonDocument("Login",login),
                new BsonDocument("Password", password),
            });
            MyUser user = await Upload(filter);
            return user;
        }
    }
}