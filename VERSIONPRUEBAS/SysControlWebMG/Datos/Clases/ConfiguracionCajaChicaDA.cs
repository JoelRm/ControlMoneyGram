using Datos.Modelos;
using Entidades;
using System;
using System.Data.SqlClient;
using System.Linq;

namespace Datos.Clases
{
    public class ConfiguracionCajaChicaDA
    {
        public int GuardarConfiguracion(ConfiguracionCajaChicaCLS confCajaChica)
        {
            int CodResult = 0;
            try
            {
                ConfiguracionCajaChicaCLS lstConfCajaChica = null;

                using (var db = new BDControlMGEntities())
                {
                    if (confCajaChica.TipoOpeIU == "Insert")
                    {
                        lstConfCajaChica = db.Database.SqlQuery<ConfiguracionCajaChicaCLS>(
                        "Usp_InsertUpdateConfCajaChica @CompraDolares,@CompraDolaresReferencial,@VentaDolares,@CompraEuros,@VentaEuros,@CajaChicaSoles,@CajaChicaDolares,@CajaChicaEuros,@UsuarioCreacion,@TipoOpeIU",
                        new SqlParameter("@CompraDolares", confCajaChica.TCCompraDolar),
                        new SqlParameter("@CompraDolaresReferencial", confCajaChica.TCCompraDolarReferencial),
                        new SqlParameter("@VentaDolares", confCajaChica.TCVentaDolar),
                        new SqlParameter("@CompraEuros", confCajaChica.TCCompraEuro),
                        new SqlParameter("@VentaEuros", confCajaChica.TCVentaEuro),
                        new SqlParameter("@CajaChicaSoles", confCajaChica.CajaChicaActualSoles),
                        new SqlParameter("@CajaChicaDolares", confCajaChica.CajaChicaActualDolares),
                        new SqlParameter("@CajaChicaEuros", confCajaChica.CajaChicaActualEuros),
                        new SqlParameter("@UsuarioCreacion", confCajaChica.UsuarioCreacion),
                        new SqlParameter("@TipoOpeIU", "Insert")
                        ).SingleOrDefault();
                    }
                    else
                    {
                        lstConfCajaChica = db.Database.SqlQuery<ConfiguracionCajaChicaCLS>(
                        "Usp_InsertUpdateConfCajaChica @CompraDolares,@CompraDolaresReferencial,@VentaDolares,@CompraEuros,@VentaEuros,@CajaChicaSoles,@CajaChicaDolares,@CajaChicaEuros,@UsuarioCreacion,@TipoOpeIU",
                        new SqlParameter("@CompraDolares", confCajaChica.TCCompraDolar),
                        new SqlParameter("@CompraDolaresReferencial", confCajaChica.TCCompraDolarReferencial),
                        new SqlParameter("@VentaDolares", confCajaChica.TCVentaDolar),
                        new SqlParameter("@CompraEuros", confCajaChica.TCCompraEuro),
                        new SqlParameter("@VentaEuros", confCajaChica.TCVentaEuro),
                        new SqlParameter("@CajaChicaSoles", confCajaChica.CajaChicaActualSoles),
                        new SqlParameter("@CajaChicaDolares", confCajaChica.CajaChicaActualDolares),
                        new SqlParameter("@CajaChicaEuros", confCajaChica.CajaChicaActualEuros),
                        new SqlParameter("@UsuarioCreacion", confCajaChica.UsuarioCreacion),
                        new SqlParameter("@TipoOpeIU", "Update")
                        ).SingleOrDefault();
                    }

                    //lstConfCajaChica = db.Database.SqlQuery<ConfiguracionCajaChicaCLS>("Usp_obtenerConfCajaChica").SingleOrDefault();
                    CodResult = 1;
                }
            }
            catch (Exception Ex)
            {
                CodResult = 0;
            }
            return CodResult;
        }

        public ConfiguracionCajaChicaCLS ObtenerUltimaConfCajaChica()
        {
            ConfiguracionCajaChicaCLS lstConfCajaChica = null;
            using (var db = new BDControlMGEntities())
            {
                lstConfCajaChica = db.Database.SqlQuery<ConfiguracionCajaChicaCLS>("Usp_obtenerUltimaConfCajaChica").SingleOrDefault();
            }
            return lstConfCajaChica;
        }
    }
}
