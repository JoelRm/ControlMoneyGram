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
    public class ConfiguracionCajaDA
    {
        public int GuardarConfiguracion(ConfiguracionCajaCLS confCaja)
        {
            int CodResult = 0;
            try
            {
                ConfiguracionCajaCLS lstConfCaja = null;

                using (var db = new BDControlMGEntities())
                {
                    if (confCaja.TipoOpeIU == "Insert")
                    {
                        lstConfCaja = db.Database.SqlQuery<ConfiguracionCajaCLS>(
                        "Usp_InsertUpdateConfCaja @CompraDolares,@CompraDolaresReferencial,@VentaDolares,@CompraEuros,@VentaEuros,@CajaSoles,@CajaDolares,@CajaEuros,@UsuarioCreacion,@TipoOpeIU",
                        new SqlParameter("@CompraDolares", confCaja.TCCompraDolar),
                        new SqlParameter("@CompraDolaresReferencial", confCaja.TCCompraDolarReferencial),
                        new SqlParameter("@VentaDolares", confCaja.TCVentaDolar),
                        new SqlParameter("@CompraEuros", confCaja.TCCompraEuro),
                        new SqlParameter("@VentaEuros", confCaja.TCVentaEuro),
                        new SqlParameter("@CajaSoles", confCaja.CajaActualSoles),
                        new SqlParameter("@CajaDolares", confCaja.CajaActualDolares),
                        new SqlParameter("@CajaEuros", confCaja.CajaActualEuros),
                        new SqlParameter("@UsuarioCreacion", confCaja.UsuarioCreacion),
                        new SqlParameter("@TipoOpeIU", "Insert")
                        ).SingleOrDefault();
                    }
                    else
                    {
                       lstConfCaja = db.Database.SqlQuery<ConfiguracionCajaCLS>(
                       "Usp_InsertUpdateConfCaja @CompraDolares,@CompraDolaresReferencial,@VentaDolares,@CompraEuros,@VentaEuros,@CajaSoles,@CajaDolares,@CajaEuros,@UsuarioCreacion,@TipoOpeIU",
                       new SqlParameter("@CompraDolares", confCaja.TCCompraDolar),
                       new SqlParameter("@CompraDolaresReferencial", confCaja.TCCompraDolarReferencial),
                       new SqlParameter("@VentaDolares", confCaja.TCVentaDolar),
                       new SqlParameter("@CompraEuros", confCaja.TCCompraEuro),
                       new SqlParameter("@VentaEuros", confCaja.TCVentaEuro),
                       new SqlParameter("@CajaSoles", confCaja.TCVentaEuro),
                       new SqlParameter("@CajaDolares", confCaja.TCVentaEuro),
                       new SqlParameter("@CajaEuros", confCaja.TCVentaEuro),
                       new SqlParameter("@UsuarioCreacion", confCaja.UsuarioCreacion),
                       new SqlParameter("@TipoOpeIU", "Update")
                       ).SingleOrDefault();
                    }

                    //lstConfCaja = db.Database.SqlQuery<ConfiguracionCajaCLS>("Usp_obtenerConfCaja").SingleOrDefault();
                    CodResult = 1;
                }
            }
            catch (Exception Ex)
            {
                CodResult = 0;
            }
            return CodResult;
        }
        public ConfiguracionCajaCLS ObtenerUltimaConfCaja()
        {
            ConfiguracionCajaCLS lstConfCaja = null;
            using (var db = new BDControlMGEntities())
            {
                lstConfCaja = db.Database.SqlQuery<ConfiguracionCajaCLS>("Usp_obtenerUltimaConfCaja").SingleOrDefault();
            }
            return lstConfCaja;
        }


    }
}
