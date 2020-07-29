using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using www.cepas.tur.ar.Data.Repositories;
using www.cepas.tur.ar.Extensions;
using www.cepas.tur.ar.Models;

namespace www.cepas.tur.ar.Providers.Report
{
    public interface IBookingReportsProvider
    {
        List<BookingsByDateViewModel> GetBookingsReport(BookingsReportRequestViewModel request);
    }
    public class BookingReportsProvider : IBookingReportsProvider
    {
        private readonly IBookingRepository _bookingRepository;
        public BookingReportsProvider(IBookingRepository bookingRepository) 
        {
            _bookingRepository = bookingRepository;
        }
        private string GetMonthDescription(int numberMonth)
        {
            DateTimeFormatInfo dateFormatted = CultureInfo.CurrentCulture.DateTimeFormat;
            return dateFormatted.GetMonthName(numberMonth);
        }

        public List<BookingsByDateViewModel> GetBookingsReport(BookingsReportRequestViewModel request)
        {
            var actualFrom = new DateTime(DateTime.UtcNow.Year, 1, 1, 00, 00, 00);
            var actualTo = new DateTime(DateTime.UtcNow.Year, 12, 31, 23, 59, 59);

            var pastTo = actualTo.AddYears(-1);
            var pastFrom = actualFrom.AddYears(-1);

            var actualBookings = _bookingRepository.GetBookingHeaders(actualFrom, actualTo).OrderBy(x => x.DateTime);
            var pastBookings = _bookingRepository.GetBookingHeaders(pastFrom, pastTo).OrderBy(x => x.DateTime);

            var bookingsByDateViewModels = new ConcurrentDictionary<string, BookingsByDateViewModel>();

            for (int month=1; month<13; month++)
            {
                var key = GetMonthDescription(month);
                var currentYear = DateTime.UtcNow.Year;
                var pastYear = DateTime.UtcNow.AddYears(-1).Year;

                if (!bookingsByDateViewModels.ContainsKey(key))
                {
                    bookingsByDateViewModels[key] = new BookingsByDateViewModel
                    {
                        Month = key,
                        MonthNumber = month,
                        QuantityActual = actualBookings.Count(x => x.DateTime.Year == currentYear && x.DateTime.Month == month),
                        QuantityPast = pastBookings.Count(x => x.DateTime.Year == pastYear && x.DateTime.Month == month)
                    };
                }
            }

            return bookingsByDateViewModels.Values.OrderBy(x => x.MonthNumber).ToList();
        }
    }
}
