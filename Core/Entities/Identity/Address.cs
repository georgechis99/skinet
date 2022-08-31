using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Identity
{
    public class Address
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }


        //this way, the Entity Framework will sort out the one-to-one relationship
            //between an AppUser and his/her Address and will set a Foreign Key\
            //constraint on the AppUserId automatically in the database 
        
        [Required]
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}