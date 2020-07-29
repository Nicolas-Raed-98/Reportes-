using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using www.cepas.tur.ar.Data.Repositories;
using www.cepas.tur.ar.Extensions;
using www.cepas.tur.ar.Models;

namespace www.cepas.tur.ar.Providers.Report
{
    public interface IOperatorReportsProvider
    {
        List<OperatorByDateViewModel> GetOperatorsReport(OperatorReportRequestViewModel request);

    }

    public class OperatorReportsProvider : IOperatorReportsProvider
    {
        private IBookingItemRepository _bookingItemRepository;
        public OperatorReportsProvider(IBookingItemRepository bookingItemRepository)
        {
            _bookingItemRepository = bookingItemRepository;
        }
        public List<OperatorByDateViewModel> GetOperatorsReport(OperatorReportRequestViewModel request)
        {
            var from = request.From.ToDateTime();
            var to = request.To.ToDateTime(23, 59, 59);

            var quantityBookings = _bookingItemRepository.GetByDateOperator(from, to).OrderBy(x => x.Provider.Name);

            var operatorsByDateViewModel = new ConcurrentDictionary<string, OperatorByDateViewModel>();

            foreach (var bookingItem in quantityBookings)
            {
                var key = bookingItem.Provider.Name;
                if (!operatorsByDateViewModel.ContainsKey(key))
                {
                    {
                        operatorsByDateViewModel[key] = new OperatorByDateViewModel

                        {
                            OperatorName = key,
                            QuantityBooking = quantityBookings.Count(x => x.ActivityDateTime.Year == bookingItem.ActivityDateTime.Year && x.ActivityDateTime.Month == bookingItem.ActivityDateTime.Month)
                        };
                    }
                 }
            }

            return operatorsByDateViewModel.Values.ToList().FindAll(v => v.OperatorName!="CEPAS").OrderBy(x => x.OperatorName).ToList();
        }
    }
}

