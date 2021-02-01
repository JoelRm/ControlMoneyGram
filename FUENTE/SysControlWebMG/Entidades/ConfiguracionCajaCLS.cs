using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class ConfiguracionCajaCLS
    {
        public decimal CajaActualSoles { get; set; }
        public decimal CajaActualDolares { get; set; }
        public decimal CajaActualEuros { get; set; }
        public decimal TCCompraDolar { get; set; }
        public decimal TCVentaDolar { get; set; }
        public decimal TCCompraEuro { get; set; }
        public decimal TCVentaEuro { get; set; }
        public string TipoOpeIU { get; set; }        
    }
}
