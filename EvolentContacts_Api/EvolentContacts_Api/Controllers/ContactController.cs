using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvolentContacts_Api.Models;

namespace EvolentContacts_Api.Controllers
{
    [RoutePrefix("Api/Contact")]
    public class ContactController : ApiController
    {
        EvolentDBEntities objEntity = new EvolentDBEntities();

        [HttpGet]
        [Route("test")]
        public string HealthCheck()
        {
            return "success";
        }
        [HttpGet]
        [Route("GetContactDetails")]
        public IQueryable<Contact> GetContacts()
        {
            try
            {
                return objEntity.Contacts.Where(x => x.Status == true);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetContactDetailsById/{id}")]
        public IHttpActionResult GetContactById(string id)
        {
            Contact obj = new Contact();
            var contactId = Convert.ToInt32(id);
            try
            {
                obj = objEntity.Contacts.Find(contactId);
                if (obj == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(obj);
        }

        [HttpPost]
        [Route("InsertContactDetails")]
        public IHttpActionResult PostUser(Contact contact)
        {
            string message = "";
            if (contact != null)
            {

                try
                {
                    objEntity.Contacts.Add(contact);
                    int result = objEntity.SaveChanges();
                    if (result > 0)
                    {
                        message = "Contact has been added";
                    }
                    else
                    {
                        message = "Faild to add contact";
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }

            return Ok(message);
        }

        [HttpPut]
        [Route("UpdateContactDetails")]
        public IHttpActionResult PutUserMaster(Contact contact)
        {
            string message = "";
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Contact obj = new Contact();
                obj = objEntity.Contacts.Find(contact.Id);
                if (obj != null)
                {
                    obj.FirstName = contact.FirstName;
                    obj.LastName = contact.LastName;
                    obj.Email = contact.Email;
                    obj.Phone = contact.Phone;
                }

                int result = objEntity.SaveChanges();
                if (result > 0)
                {
                    message = "Contact has been updated";
                }
                else
                {
                    message = "Faild to update contact";
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(message);
        }

        [HttpDelete]
        [Route("DeactivateContact/{id}")]
        public IHttpActionResult DeactivateContact(int id)
        {
            string message = "";
            Contact contact = objEntity.Contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }
            contact.Status = false;
            int result = objEntity.SaveChanges();
            if (result > 0)
            {
                message = "Contact deactivated";
            }
            else
            {
                message = "Faild to deactivate";
            }           

            return Ok(message);
        }
    }
}
