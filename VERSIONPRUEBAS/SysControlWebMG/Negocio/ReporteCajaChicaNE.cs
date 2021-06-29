using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class ReporteCajaChicaNE
    {
        ReporteCajaChicaDA obj = new ReporteCajaChicaDA();
        public List<CalatogoCLS> CargaInicial()
        {
            return obj.CargaInicial();
        }

        public List<OperacionCajaChicaCLS> GenerarReporteOperacionesCajachica(FiltrosReporte objFiltros)
        {
            return obj.GenerarReporteOperacionesCajachica(objFiltros);
        }


        public List<CalculadoraCLS> GenerarReporteCajaChicaCalculadora(FiltrosReporte objFiltros)
        {
            return obj.GenerarReporteCajaChicaCalculadora(objFiltros);
        }

        public ConfiguracionCajaChicaCLS GenerarReporteGananciaCajaChica(FiltrosReporte objFiltros)
        {
            return obj.GenerarReporteGananciaCajaChica(objFiltros);
        }
    }
}
