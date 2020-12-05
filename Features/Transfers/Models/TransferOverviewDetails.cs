using System.Collections.Generic;

namespace Transfers {

    public class TransferOverviewDetails {

        public IEnumerable<TotalPersonsPerCustomer> TotalPersonsPerCustomer { get; set; }
        public IEnumerable<TotalPersonsPerDestination> TotalPersonsPerDestination { get; set; }
        public IEnumerable<TotalPersonsPerDriver> TotalPersonsPerDriver { get; set; }
        public IEnumerable<TotalPersonsPerPort> TotalPersonsPerPort { get; set; }
        public IEnumerable<TotalPersonsPerRoute> TotalPersonsPerRoute { get; set; }

    }

}