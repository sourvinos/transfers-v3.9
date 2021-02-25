using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Transfers {

    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]

    public class TransfersController : ControllerBase {

        private readonly ITransferRepository repo;
        private readonly IHubContext<AnnouncementHub> hubContext;
        private readonly ILogger<TransfersController> logger;
        private readonly IMapper mapper;

        public TransfersController(ITransferRepository repo, IHubContext<AnnouncementHub> hubContext, ILogger<TransfersController> logger, IMapper mapper) {
            this.repo = repo;
            this.hubContext = hubContext;
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpGet("date/{date}")]
        public TransferGroupResultResource<TransferResource> Get(string date) {
            return this.repo.Get(date);
        }

        [HttpGet("[action]/fromDate/{fromDate}/toDate/{toDate}")]
        public TransferOverview GetOverview(string fromDate, string toDate) {
            return this.repo.GetOverview(fromDate, toDate);
        }

        [HttpGet("[action]/fromDate/{fromDate}/toDate/{toDate}")]
        public TransferOverviewDetails GetOverviewDetails(string fromDate, string toDate) {
            return this.repo.GetOverviewDetails(fromDate, toDate);
        }

        [HttpGet("[action]/fromDate/{fromDate}/toDate/{toDate}")]
        public IEnumerable<TotalPersonsPerDate> TotalPersonsPerDate(string fromDate, string toDate) {
            return this.repo.GetTotalPersonsPerDate(fromDate, toDate);
        }

        [HttpGet("[action]/fromDate/{fromDate}/toDate/{toDate}")]
        public async Task<IEnumerable<TotalPersonsPerDate>> TotalPersonsPerMonth(string fromDate, string toDate) {
            return await this.repo.GetTotalPersonsPerMonth(fromDate, toDate);
        }

        [HttpGet("[action]/fromDate/{fromDate}/toDate/{toDate}")]
        public async Task<IEnumerable<TotalPersonsPerYear>> TotalPersonsPerYear(string fromDate, string toDate) {
            return await this.repo.GetTotalPersonsPerYear(fromDate, toDate);
        }

        [HttpGet("[action]/{date}")]
        public IEnumerable<TotalPersonsPerDatePerDestination> GetTotalPersonsPerDatePerDestination(string date) {
            return this.repo.GetTotalPersonsPerDatePerDestination(date);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransfer(int id) {
            var transfer = await repo.GetById(id);
            if (transfer == null) {
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            };
            return StatusCode(200, transfer);
        }

        [HttpPost]
        public IActionResult PostTransfer([FromBody] SaveTransferResource record) {
            if (ModelState.IsValid) {
                try {
                    repo.Create(mapper.Map<SaveTransferResource, Transfer>(record));
                    SendNotificationsToClients();
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
        public IActionResult PutTransfer([FromRoute] int id, [FromBody] SaveTransferResource record) {
            if (id == record.Id && ModelState.IsValid) {
                try {
                    repo.Update(record);
                    SendNotificationsToClients();
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
        public async Task<IActionResult> DeleteTransfer([FromRoute] int id) {
            Transfer record = await repo.GetByIdToDelete(id);
            if (record == null) {
                LoggerExtensions.LogException(id, logger, ControllerContext, null, null);
                return StatusCode(404, new {
                    response = ApiMessages.RecordNotFound()
                });
            }
            try {
                repo.Delete(record);
                SendNotificationsToClients();
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

        [HttpPatch("assignDriver")]
        public IActionResult AssignDriver(int driverId, [FromQuery(Name = "id")] int[] ids) {
            try {
                repo.AssignDriver(driverId, ids);
                return StatusCode(200, new { response = ApiMessages.RecordUpdated() });
            } catch (DbUpdateException exception) {
                LoggerExtensions.LogException(driverId, logger, ControllerContext, null, exception);
                return StatusCode(490, new {
                    response = ApiMessages.RecordNotSaved()
                });
            }
        }

        private string GetTomorrow() {
            DateTime tommorow = DateTime.Today.AddDays(1);
            return tommorow.ToString("yyyy/MM/dd");
        }

        private void SendNotificationsToClients() {
            var tomorrowPersons = repo.GetTotalPersonsPerDate(GetTomorrow(), GetTomorrow());
            hubContext.Clients.All.SendAsync("BroadcastMessage", tomorrowPersons);
        }

    }

}