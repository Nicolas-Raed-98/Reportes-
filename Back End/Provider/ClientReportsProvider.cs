using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using www.cepas.tur.ar.Data.Repositories;
using www.cepas.tur.ar.Extensions;
using www.cepas.tur.ar.Models;

namespace www.cepas.tur.ar.Providers
{
    public interface IClientReportsProvider
    {
        List<ClientsByDateViewModel> GetClientsReport(ClientsReportRequestViewModel request);
    }
    public class ClientReportsProvider : IClientReportsProvider
    {
        private IBookingRepository _bookingRepository;

        public ClientReportsProvider(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }
        public List<ClientsByDateViewModel> GetClientsReport(ClientsReportRequestViewModel request)
        {
            var from = request.From.ToDateTime();
            var to = request.To.ToDateTime(23, 59, 59);

            var quantityBookings = _bookingRepository.GetBookingHeaders(from, to).OrderBy(x => x.Client.Name);

            var clientsByDateViewModels = new ConcurrentDictionary<string, ClientsByDateViewModel>();

            foreach (var booking in quantityBookings)
            {
                var key = booking.Client.Name;
                if (!clientsByDateViewModels.ContainsKey(key))
                {
                    clientsByDateViewModels[key] = new ClientsByDateViewModel
                {
                        ClientName = key,
                        QuantityBooking = quantityBookings.Count(x => x.DateTime.Year == booking.DateTime.Year && x.DateTime.Month == booking.DateTime.Month && x.Client.Id==booking.Client.Id)
                    };
                }
                }
           

            return clientsByDateViewModels.Values.OrderByDescending(x => x.QuantityBooking).Take(10).OrderBy(x => x.ClientName).ToList();
        }
        
        
    }
}
 