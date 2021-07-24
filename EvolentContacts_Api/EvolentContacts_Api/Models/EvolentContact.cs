using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EvolentContacts_Api.Models
{
    public class EvolentContact
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool Status { get; set; }
    }
}