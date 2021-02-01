using System;

namespace Entidades
{
    public class FiltrosReporte
    {
        public DateTime Finicio { get; set; }
        public DateTime Ffin { get; set; }
        public int TipoOperacion { get; set; }
        public string Usuario { get; set; }
        public int Estado { get; set; }
    }
}
