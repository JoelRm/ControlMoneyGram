using System;

namespace Entidades
{
    public class OperacionCajaChicaCLS
    {
        public int IdOperacionCajaChica { get; set; }
        public int TipoOperacionCajaChica { get; set; }
        public decimal MontoIngreso { get; set; }
        public decimal MontoSalida { get; set; }
        public int Moneda { get; set; }
        public string Comentario { get; set; }
        public string NombreOperacionCajaChica { get; set; }
        public decimal TipoCambio { get; set; }
        public bool FlagSumaCajaChicaSol { get; set; }
        public bool FlagRestaCajaChicaSol { get; set; }
        public bool FlagSumaCajaChicaDolar { get; set; }
        public bool FlagRestaCajaChicaDolar { get; set; }
        public bool FlagSumaCajaChicaEuro { get; set; }
        public bool FlagRestaCajaChicaEuro { get; set; }
        public DateTime FechaMovimiento { get; set; }
        public bool Eliminado { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }

        /// para submenú "VER OperacionCajaChicaES"
        public decimal CajaChicaSol { get; set; }
        public decimal CajaChicaDolar { get; set; }
        public decimal CajaChicaEuro { get; set; }
        public string DescripcionOperacionCajaChica { get; set; }
        public string NombreMoneda { get; set; }
        public string DescripcionEstado { get; set; }
        public string HoraCreacion { get; set; }
    }
}
