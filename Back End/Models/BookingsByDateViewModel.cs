using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace www.cepas.tur.ar.Models
{
    public class BookingsByDateViewModel
{
        public int MonthNumber { get; set; }
        public string Month { get; set; }
        public int QuantityActual { get; set; }
        public int QuantityPast { get; set; }
    }
}
