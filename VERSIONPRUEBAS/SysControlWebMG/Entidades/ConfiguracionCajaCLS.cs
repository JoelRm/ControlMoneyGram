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
        public decimal TCCompraDolarReferencial { get; set; }
        public decimal TCVentaDolar { get; set; }
        public decimal TCCompraEuro { get; set; }
        public decimal TCVentaEuro { get; set; }
        public string TipoOpeIU { get; set; }
        public string UsuarioCreacion { get; set; }


        // Campos para reporte ganancia
        public decimal TipoCambioReferencial { get; set; }
        public decimal InicioCajaTotalDolares { get; set; }
        public decimal FinCajaTotalDolares { get; set; }
        public decimal TotalIngresosDolar { get; set; }
        public decimal TotalEnviosDolar { get; set; }
        public decimal TotalPagosDolar { get; set; }
        public decimal TotalGastosDolar { get; set; }
        public decimal Ganancia { get; set; }

    }
}
