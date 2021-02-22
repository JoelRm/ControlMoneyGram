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
    public class ReporteDA
    {
        public List<OperacionCLS> GenerarReporte(FiltrosReporte objFiltros)
        {
            List<OperacionCLS> lstReporte = new List<OperacionCLS>();
            using (var db = new BDControlMGEntities())
            {
                lstReporte = db.Database.SqlQuery<OperacionCLS>(
                "exec Usp_ReporteOperacion @FechaIni, @FechaFin, @TipoOperacion, @Eliminado, @Usuario",
                new SqlParameter("@FechaIni", objFiltros.Finicio),
                new SqlParameter("@FechaFin", objFiltros.Ffin),
                new SqlParameter("@TipoOperacion", objFiltros.TipoOperacion),
                new SqlParameter("@Eliminado", objFiltros.Estado),
                new SqlParameter("@Usuario", objFiltros.Usuario)).ToList();
            }
            return lstReporte;
        }
        public List<CalculadoraCLS> GenerarReporteCalculadora(FiltrosReporte objFiltros)
        {
            List<CalculadoraCLS> lstReporte = new List<CalculadoraCLS>();
            using (var db = new BDControlMGEntities())
            {
                lstReporte = db.Database.SqlQuery<CalculadoraCLS>(
                "exec Usp_ReporteOperacionCalculadora @FechaInicio, @FechaFin, @Eliminado, @Usuario",
                new SqlParameter("@FechaInicio", objFiltros.Finicio),
                new SqlParameter("@FechaFin", objFiltros.Ffin),
                new SqlParameter("@Eliminado", objFiltros.Estado),
                new SqlParameter("@Usuario", objFiltros.Usuario)).ToList();
            }
            return lstReporte;
        }

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
    }
}
