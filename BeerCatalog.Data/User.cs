using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace BeerCatalog.Data
{
    public class User: IdentityUser
    {
        public DateTime BornDate { get; set; }
        public ICollection<User> Friends { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Brewing> Posts { get; set; }
        public ICollection<Preference> Preferences { get; set; }


        public User()
        {
            Friends = new List<User>();
            Comments = new List<Comment>();
            Posts = new List<Brewing>();
            Preferences = new List<Preference>();
        }
    }
}
