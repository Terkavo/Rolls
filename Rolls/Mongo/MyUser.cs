using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System.Security.Claims;

namespace Rolls.Mongo
{
    public class MyUser
    {
        [BsonId]
        public BsonObjectId Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        internal List<Claim> Claims
        {
            get
            {
                return new List<Claim>() { new Claim(ClaimsIdentity.DefaultNameClaimType, Login) };
            }
        }
        public static async Task<MyUser> UploadAsync(string login, string password)
        {
            var filter = new BsonDocument("$and",
                new BsonArray{
                new BsonDocument("Login",login),
                new BsonDocument("Password", password),
            });
            List<MyUser> list = await UploadListUserAsync(filter);
            if (list.Count==0)
                throw new Exception("NotFound");
            return list[0];
        }
        public static async Task<List<MyUser>> UploadListUserAsync(BsonDocument bson)
        {
            var res = await MyMongo.UsersCollection.FindAsync<MyUser>(bson);
            return res.ToList();
        }
    }
}