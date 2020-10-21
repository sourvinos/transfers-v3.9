using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize]

    public class CustomersController : ControllerBase {

        private readonly ICustomerRepository repo;
        private readonly MessageService messageService;

        public CustomersController(ICustomerRepository repo, MessageService messageService) =>
            (this.repo, this.messageService) = (repo, messageService);

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<Customer>> Get() =>
            await repo.Get();

        [HttpGet("[action]")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IEnumerable<Customer>> GetActive() =>
            await repo.GetActive(x => x.IsActive);

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCustomer(int id) {
            Customer customer = await repo.GetById(id);
            if (customer == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            return StatusCode(200, customer);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostCustomer([FromBody] Customer customer) {
            if (!ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Create(customer);
                return StatusCode(200, new { response = ApiMessages.RecordCreated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutCustomer([FromRoute] int id, [FromBody] Customer customer) {
            if (id != customer.Id || !ModelState.IsValid) return StatusCode(490, new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(customer);
                return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
            } catch (Exception) {
                return StatusCode(500, new { response = messageService.GetMessage("VeryBad") });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id) {
            Customer customer = await repo.GetById(id);
            if (customer == null) return StatusCode(404, new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(customer);
                return StatusCode(200, new { response = ApiMessages.RecordDeleted() });
            } catch (Exception) {
                return StatusCode(491, new { response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}