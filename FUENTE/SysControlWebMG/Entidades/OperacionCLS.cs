using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class OperacionCLS
    {
        public int TipoOperacion { get; set; }
        public decimal MontoIngreso { get; set; }
		public decimal MontoSalida { get; set; }
		public int Moneda { get; set; }
		public string Comentario { get; set; }
		public decimal TipoCambio { get; set; }		
		public bool FlagSumaCajaSol { get; set; }
		public bool FlagRestaCajaSol { get; set; }
		public bool FlagSumaCajaDolar { get; set; }
		public bool FlagRestaCajaDolar { get; set; }
		public bool FlagSumaCajaEuro { get; set; }
		public bool FlagRestaCajaEuro { get; set; }
		public DateTime HoraMovimiento { get; set; }
		public DateTime FechaMovimiento { get; set; }
		public bool Eliminado { get; set; }
		public string UsuarioCreacion { get; set; }
		public DateTime FechaCreacion { get; set; }
    }
}