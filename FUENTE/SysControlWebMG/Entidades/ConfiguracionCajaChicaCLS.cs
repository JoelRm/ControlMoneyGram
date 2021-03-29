
namespace Entidades
{
    public class ConfiguracionCajaChicaCLS
    {
        public decimal CajaChicaActualSoles { get; set; }
        public decimal CajaChicaActualDolares { get; set; }
        public decimal CajaChicaActualEuros { get; set; }
        public decimal TCCompraDolar { get; set; }
        public decimal TCCompraDolarReferencial { get; set; }
        public decimal TCVentaDolar { get; set; }
        public decimal TCCompraEuro { get; set; }
        public decimal TCVentaEuro { get; set; }
        public string TipoOpeIU { get; set; }
        public string UsuarioCreacion { get; set; }


        // Campos para reporte ganancia
        public decimal TipoCambioReferencial { get; set; }
        public decimal InicioCajaChicaTotalDolares { get; set; }
        public decimal FinCajaChicaTotalDolares { get; set; }
        public decimal TotalIngresosDolar { get; set; }
        public decimal TotalEnviosDolar { get; set; }
        public decimal TotalPagosDolar { get; set; }
        public decimal TotalGastosDolar { get; set; }
        public decimal Ganancia { get; set; }
    }
}
