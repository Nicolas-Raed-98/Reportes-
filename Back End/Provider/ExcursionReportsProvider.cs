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
    public interface IExcursionReportsProvider
    {
        List<ExcursionsByDateViewModel> GetExcursionsReport(ExcursionsReportRequestViewModel request);
    }
    public class ExcursionReportsProvider : IExcursionReportsProvider
    {
        private readonly IBookingItemRepository _bookingItemRepository;
        public ExcursionReportsProvider(IBookingItemRepository bookingItemRepository)
        {
            _bookingItemRepository = bookingItemRepository;
        }
        public List<ExcursionsByDateViewModel> GetExcursionsReport(ExcursionsReportRequestViewModel request)
        {
            var from = request.From.ToDateTime();
            var to = request.To.ToDateTime(23, 59, 59);

            var searchExcursions = _bookingItemRepository.GetByDateRange(from, to).OrderBy(x => x.Product.Title);

            var excursionsByDateViewModels = new ConcurrentDictionary<string, ExcursionsByDateViewModel>();

            foreach (var excursion in searchExcursions)
            {
                var key = excursion.Product.Title;

                if (!excursionsByDateViewModels.ContainsKey(key))
                {
                    excursionsByDateViewModels[key] = new ExcursionsByDateViewModel
                    {
                        Title = key,
                        ProductId = excursion.Product.Id,
                        Quantity = searchExcursions.Count(x => x.Product.Id == excursion.Product.Id)
                    };
                }
            }

            return excursionsByDateViewModels.Values.OrderByDescending(x => x.Quantity).Take(10).OrderBy(x => x.Title).ToList();
        }
    }  
}
