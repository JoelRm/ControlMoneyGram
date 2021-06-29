using System;

namespace Entidades
{
    public class CuadreCajaCLS
    {
        public string UsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool Eliminado { get; set; }        
        public decimal CajaSolesSistema { get; set; }
        public decimal CajaSolesCuadre { get; set; }
        public decimal CajaDolaresSistema { get; set; }
        public decimal CajaDolaresCuadre { get; set; }
        public decimal CajaEurosSistema { get; set; }
        public decimal CajaEurosCuadre { get; set; }
        public string CantidadxBilletexMoneda { get; set; }
        public int NumeroBilletesDeteriorados { get; set; }
        public string Comentario { get; set; }
    }
}
