﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Transfers {

    [Route("api/[controller]")]
    [Authorize(Policy = "RequireLoggedIn")]
    public class CustomersController : ControllerBase {

        private readonly ICustomerRepository repo;
        private readonly ProductService productService;

        public CustomersController(ICustomerRepository repo, ProductService productService) =>
            (this.repo, this.productService) = (repo, productService);

        [HttpGet]
        public async Task<IEnumerable<Customer>> Get() =>
            await repo.Get();

        [HttpGet("[action]")]
        public async Task<IEnumerable<Customer>> GetActive() =>
            await repo.GetActive(x => x.IsActive);

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id) {
            Customer customer = await repo.GetById(id);
            if (customer == null) return NotFound(new { response = productService.GetMessage() });
            return Ok(customer);
        }

        [HttpPost]
        public IActionResult PostCustomer([FromBody] Customer customer) {
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            repo.Create(customer);
            return Ok(new { response = ApiMessages.RecordCreated() });
        }

        [HttpPut("{id}")]
        public IActionResult PutCustomer([FromRoute] int id, [FromBody] Customer customer) {
            if (id != customer.Id) return BadRequest(new { response = ApiErrorMessages.InvalidId() });
            if (!ModelState.IsValid) return BadRequest(new { response = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage) });
            try {
                repo.Update(customer);
            } catch (System.Exception) {
                return NotFound(new { response = ApiErrorMessages.RecordNotFound() });
            }
            return Ok(new { response = ApiMessages.RecordUpdated() });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id) {
            Customer customer = await repo.GetById(id);
            if (customer == null) return NotFound(new { response = ApiErrorMessages.RecordNotFound() });
            try {
                repo.Delete(customer);
                return Ok(new { response = ApiMessages.RecordDeleted() });
            } catch (DbUpdateException) {
                return BadRequest(new { response = ApiErrorMessages.RecordInUse() });
            }
        }

    }

}