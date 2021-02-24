using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class ReporteNE
    {
        ReporteDA obj = new ReporteDA();
        public List<OperacionCLS> GenerarReporte(FiltrosReporte objFiltros)
        {
            return obj.GenerarReporte(objFiltros);
        }

        public ConfiguracionCajaCLS GenerarReporteGanancia(FiltrosReporte objFiltros)
        {
            return obj.GenerarReporteGanancia(objFiltros);
        }
        
        public List<CalculadoraCLS> GenerarReporteCalculadora(FiltrosReporte objFiltros)
        {
            return obj.GenerarReporteCalculadora(objFiltros);
        }
        public List<CalatogoCLS> CargaInicial()
        {
            return obj.CargaInicial();
        }
    }
}
