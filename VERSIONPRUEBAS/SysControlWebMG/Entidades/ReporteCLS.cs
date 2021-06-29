using System;

namespace Entidades
{
    public class ReporteCLS
    {
        public int Id_Operacion { get; set; }
        public int Id_Tipo_Operacion { get; set; }
        public decimal Monto_Salida { get; set; }
        public decimal Tipo_Cambio { get; set; }
        public decimal? Caja_Sol { get; set; }
        public decimal? Caja_Dolar { get; set; }
        public decimal? Caja_Euro { get; set; }
        public string Desc_Operacion { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }
        public string Fecha_Javascript { get; set; }
        public bool Estado { get; set; }
    }
}
