using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using www.cepas.tur.ar.Models;
using www.cepas.tur.ar.Providers;
using www.cepas.tur.ar.Providers.Report;

namespace www.cepas.tur.ar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReportsController : ControllerBase
    {
        private readonly IBookingReportsProvider _bookingReportsProvider;
        private readonly IExcursionReportsProvider _excursionReportsProvider;
        private readonly IClientReportsProvider _clientReportsProvider;
        private readonly IOperatorReportsProvider _operatorReportsProvider;
        private readonly IGuideReportProvider _guideReportsProvider;
        private readonly ITransportReportProvider _transportReportProvider;

        public ReportsController(IBookingReportsProvider bookingReportsProvider, IExcursionReportsProvider excursionReportsProvider,
            IClientReportsProvider clientReportsProvider, IOperatorReportsProvider operatorReportsProvider, IGuideReportProvider guideReportProvider, ITransportReportProvider transportReportProvider )
        {
            _bookingReportsProvider = bookingReportsProvider;
            _excursionReportsProvider = excursionReportsProvider;
            _clientReportsProvider = clientReportsProvider;
            _operatorReportsProvider = operatorReportsProvider;
            _guideReportsProvider = guideReportProvider;
            _transportReportProvider = transportReportProvider;
        }

        [HttpPost("Booking")]
        public async Task<IActionResult> GetBookingsReport ([FromBody] BookingsReportRequestViewModel request)
        {
            
            var bookingsByDateViewModels = _bookingReportsProvider.GetBookingsReport(request);
            return Ok(bookingsByDateViewModels);

        }
        [HttpPost("Activity")]
        public async Task<IActionResult> GetActivitiesReport([FromBody] ExcursionsReportRequestViewModel request)
        {

            var excursionsByDateViewModel = _excursionReportsProvider.GetExcursionsReport(request);
            return Ok(excursionsByDateViewModel);

        }
        [HttpPost("Client")]
        public async Task<IActionResult> GetClientsReport([FromBody] ClientsReportRequestViewModel request)
        {

            var clientsByDateViewModels = _clientReportsProvider.GetClientsReport(request);
            return Ok(clientsByDateViewModels);

        }
        [HttpPost("Operator")]
        public async Task<IActionResult> GetOperatorsReport([FromBody] OperatorReportRequestViewModel request)
        {

            var operatorByDateViewModel = _operatorReportsProvider.GetOperatorsReport(request);
            return Ok(operatorByDateViewModel);

        }
        [HttpPost("Guide")]
        public async Task<IActionResult> GetGuidesReport([FromBody] GuideReportRequestViewModel request)
        {

            var guideByDateViewModel = _guideReportsProvider.GetGuidesReport(request);
            return Ok(guideByDateViewModel);

        }
        [HttpPost("Transport")]
        public async Task<IActionResult> GetTransportsReport([FromBody] TransportReportRequestViewModel request)
        {

            var transportByDateViewModel = _transportReportProvider.GetTransportsReport(request);
            return Ok(transportByDateViewModel);

        }
    }
}