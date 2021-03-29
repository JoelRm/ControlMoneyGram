using Datos.Modelos;
using Entidades;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos.Clases
{
    public class ReporteCajaChicaDA
    {
        public List<CalatogoCLS> CargaInicial()
        {
            List<CalatogoCLS> lstCatalogo = null;
            using (var db = new BDControlMGEntities())
            {
                lstCatalogo = (from catalogo in db.DatoGeneralDetalle
                               where catalogo.Habilitado == true && catalogo.DatoGeneralId == 1
                               select new CalatogoCLS
                               {
                                   IdItem = catalogo.DatoGeneralDetalleId,
                                   ValorItem = catalogo.ValorTabla.ToString(),
                                   NombreItem = catalogo.Descripcion,
                                   IdTabla = (int)catalogo.DatoGeneralId
                               }).ToList();
                return lstCatalogo;
            }
        }

        public List<OperacionCajaChicaCLS> GenerarReporteOperacionesCajachica(FiltrosReporte objFiltros)
        {
            List<OperacionCajaChicaCLS> lstReporte = new List<OperacionCajaChicaCLS>();
            using (var db = new BDControlMGEntities())
            {
                lstReporte = db.Database.SqlQuery<OperacionCajaChicaCLS>(
                "exec Usp_ReporteOperacionCajaChica @FechaIni, @FechaFin, @TipoOperacion, @Eliminado, @Usuario",
                new SqlParameter("@FechaIni", objFiltros.Finicio),
                new SqlParameter("@FechaFin", objFiltros.Ffin),
                new SqlParameter("@TipoOperacion", objFiltros.TipoOperacion),
                new SqlParameter("@Eliminado", objFiltros.Estado),
                new SqlParameter("@Usuario", objFiltros.Usuario)).ToList();
            }
            return lstReporte;
        }

        public List<CalculadoraCLS> GenerarReporteCajaChicaCalculadora(FiltrosReporte objFiltros)
        {
            List<CalculadoraCLS> lstReporte = new List<CalculadoraCLS>();
            using (var db = new BDControlMGEntities())
            {
                lstReporte = db.Database.SqlQuery<CalculadoraCLS>(
                "exec Usp_ReporteOperacionCajaChicaCalculadora @FechaInicio, @FechaFin, @Eliminado, @Usuario",
                new SqlParameter("@FechaInicio", objFiltros.Finicio),
                new SqlParameter("@FechaFin", objFiltros.Ffin),
                new SqlParameter("@Eliminado", objFiltros.Estado),
                new SqlParameter("@Usuario", objFiltros.Usuario)).ToList();
            }
            return lstReporte;
        }

        public ConfiguracionCajaChicaCLS GenerarReporteGananciaCajaChica(FiltrosReporte objFiltros)
        {
            ConfiguracionCajaChicaCLS lstReporte = new ConfiguracionCajaChicaCLS();
            using (var db = new BDControlMGEntities())
            {
                lstReporte = db.Database.SqlQuery<ConfiguracionCajaChicaCLS>("exec Usp_ReporteGananciaCajaChica @Fecha", new SqlParameter("@Fecha", objFiltros.Finicio)).SingleOrDefault();
            }
            return lstReporte;
        }
    }
}
