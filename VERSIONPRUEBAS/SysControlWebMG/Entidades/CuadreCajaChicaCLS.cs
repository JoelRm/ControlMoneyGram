using System;

namespace Entidades
{
    public class CuadreCajaChicaCLS
    {
        public string UsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool Eliminado { get; set; }
        public decimal CajaChicaSolesSistema { get; set; }
        public decimal CajaChicaSolesCuadre { get; set; }
        public decimal CajaChicaDolaresSistema { get; set; }
        public decimal CajaChicaDolaresCuadre { get; set; }
        public decimal CajaChicaEurosSistema { get; set; }
        public decimal CajaChicaEurosCuadre { get; set; }
        public string CantidadxBilletexMoneda { get; set; }
        public int NumeroBilletesDeteriorados { get; set; }
        public string Comentario { get; set; }
    }
}
