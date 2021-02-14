using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class ReporteNE
    {
        ReporteDA obj = new ReporteDA();
        public List<ReporteCLS> GenerarReporte(FiltrosReporte objFiltros)
        {
            return obj.GenerarReporte(objFiltros);
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
