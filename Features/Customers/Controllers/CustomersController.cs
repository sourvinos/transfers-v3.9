using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            if (customer == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            return Ok(customer);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult PostCustomer([FromBody] Customer customer) {
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            repo.Create(customer);
            return Ok(new { response = ApiMessages.RecordCreated() });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutCustomer([FromRoute] int id, [FromBody] Customer customer) {
            if (id != customer.Id) return BadRequest(new { response = messageService.GetMessage("InvalidId") });
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(customer);
            } catch (System.Exception) {
                return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            }
            return Ok(new { response = ApiMessages.RecordUpdated() });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id) {
            Customer customer = await repo.GetById(id);
            if (customer == null) return NotFound(new { response = messageService.GetMessage("RecordNotFound") });
            try {
                repo.Delete(customer);
                return Ok(new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return BadRequest(new { response = messageService.GetMessage("RecordInUse") });
            }
        }

    }

}