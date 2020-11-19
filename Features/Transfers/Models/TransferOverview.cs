using System.Collections.Generic;

namespace Transfers {

    public class TransferSummary {

        public int TotalPersons { get; set; }

        public float TotalAdults { get; set; }
        public float TotalKids { get; set; }
        public float TotalFree { get; set; }

        public float AdultsPercent { get; set; }
        public float KidsPercent { get; set; }
        public float FreePercent { get; set; }

        public IEnumerable<TotalPersonsPerCustomer> TotalPersonsPerCustomer { get; set; }
        public IEnumerable<TotalPersonsPerDestination> TotalPersonsPerDestination { get; set; }
        public IEnumerable<TotalPersonsPerDriver> TotalPersonsPerDriver { get; set; }
        public IEnumerable<TotalPersonsPerPort> TotalPersonsPerPort { get; set; }
        public IEnumerable<TotalPersonsPerRoute> TotalPersonsPerRoute { get; set; }

    }

}