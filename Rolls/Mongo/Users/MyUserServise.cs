using MongoDB.Bson;
using MongoDB.Driver;

namespace Rolls.Mongo.Users
{
    public class MyUserServise : Downloadable<MyUser>
    {

        public MyUserServise(MongoService mongoService)
        {
            _Collection=mongoService.UsersCollection;
        }
        public async Task<MyUser> UploadByLogin(string login)
        {
            var filter = Builders<MyUser>.Filter.Eq(x => x.Login, login);
            MyUser user = await Upload(filter);
            return user;
        }
        public async Task<MyUser> Upload(string login, string password)
        {
            var filter = Builders<MyUser>.Filter.And(
                Builders<MyUser>.Filter.Eq(x => x.Login, login),
                Builders<MyUser>.Filter.Eq(x => x.Password, password));
            MyUser user = await Upload(filter);
            return user;
        }
    }
}
