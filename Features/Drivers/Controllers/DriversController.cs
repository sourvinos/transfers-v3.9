using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Transfers {

    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]

    public class DriversController : ControllerBase {

        private readonly IDriverRepository repo;
        private readonly ILogger<DriversController> logger;

        public DriversController(IDriverRepository repo, ILogger<DriversController> logger) {
            this.repo = repo;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Driver>> Get() {
            return await repo.Get();
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Driver>> GetActive() {
            return await repo.GetActive(x => x.IsActive);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDriver(int id) {
            Driver record = await repo.GetById(id);
            if (record == null) {
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            return StatusCode(200, record);
        }

        [HttpPost]
        public async Task<IActionResult> PostDriver([FromBody] Driver record) {
            if (await repo.CheckDefaultDriverExists(null, record) != null) {
                return StatusCode(409, new {
                    response = ApiMessages.DefaultDriverAlreadyExists()
                });
            };
            if (ModelState.IsValid) {
                try {
                    repo.Create(record);
                    return StatusCode(200, new {
                        response = ApiMessages.RecordCreated()
                    });
                } catch (Exception exception) {
                    LoggerExtensions.LogException(0, logger, ControllerContext, record, exception);
                    return StatusCode(490, new {
                        response = ApiMessages.RecordNotSaved()
                    });
                }
            }
            LoggerExtensions.LogException(0, logger, ControllerContext, record, null);
            return StatusCode(400, new {
                response = ApiMessages.InvalidModel()
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDriver([FromRoute] int id, [FromBody] Driver record) {
            if (await repo.CheckDefaultDriverExists(id, record) != null) {
                return StatusCode(409, new {
                    response = ApiMessages.DefaultDriverAlreadyExists()
                });
            };
            if (id == record.Id && ModelState.IsValid) {
                try {
                    repo.Update(record);
                    return StatusCode(200, new {
                        response = ApiMessages.RecordUpdated()
                    });
                } catch (DbUpdateException exception) {
                    LoggerExtensions.LogException(0, logger, ControllerContext, record, exception);
                    return StatusCode(490, new {
                        response = ApiMessages.RecordNotSaved()
                    });
                }
            }
            LoggerExtensions.LogException(0, logger, ControllerContext, record, null);
            return StatusCode(400, new {
                response = ApiMessages.InvalidModel()
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver([FromRoute] int id) {
            Driver record = await repo.GetById(id);
            if (record == null) {
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            try {
                repo.Delete(record);
                return StatusCode(200, new {
                    response = ApiMessages.RecordDeleted()
                });
            } catch (DbUpdateException exception) {
                LoggerExtensions.LogException(0, logger, ControllerContext, record, exception);
                return StatusCode(491, new {
                    response = ApiMessages.RecordInUse()
                });
            }
        }

    }

}