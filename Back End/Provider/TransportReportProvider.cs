using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using www.cepas.tur.ar.Data.Entities;
using www.cepas.tur.ar.Data.Repositories;
using www.cepas.tur.ar.Extensions;
using www.cepas.tur.ar.Models;

namespace www.cepas.tur.ar.Providers.Report
{
    public interface ITransportReportProvider 
    {
        List<TransportByDateViewModel> GetTransportsReport (TransportReportRequestViewModel request);
    }
    public class TransportReportProvider : ITransportReportProvider
    {
        private IActivityRepository _activityRepository;

        public TransportReportProvider(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }
        public List<TransportByDateViewModel> GetTransportsReport(TransportReportRequestViewModel request)
        {
            var from = request.From.ToDateTime();
            var to = request.To.ToDateTime(23, 59, 59);

            var quantityBookings = _activityRepository.GeTransportByDateRangeReport(from, to).OrderBy(x => x.Vehicle.Owner.Name);
            

            var transportByDateViewModel = new ConcurrentDictionary<string, TransportByDateViewModel>();
            
            foreach (var activity in quantityBookings)
            {
                var key = activity.Vehicle.Owner.Name;

                if (!transportByDateViewModel.ContainsKey(key))
                {
                    transportByDateViewModel[key] = new TransportByDateViewModel
                    {
                        TransportName = key,
                        Quantity = quantityBookings.Count(x => x.ActivityDateTime.Year == activity.ActivityDateTime.Year && x.ActivityDateTime.Month == activity.ActivityDateTime.Month)
                    };
                }
            }


            return transportByDateViewModel.Values.OrderByDescending(x => x.Quantity).Take(10).OrderBy(x => x.TransportName).ToList();
        }


    }
}
