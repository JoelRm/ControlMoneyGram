using Datos.Modelos;
using Entidades;
using System;
using System.Collections.Generic;
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
                using (var db = new BDControlMGEntities())
                {
                    Caja objConfCaja = new Caja();
                    objConfCaja.CajaSoles = confCaja.CajaActualSoles;
                    objConfCaja.CajaDolares = confCaja.CajaActualDolares;
                    objConfCaja.CajaEuros = confCaja.CajaActualEuros;
                    objConfCaja.CompraDolares = confCaja.TCCompraDolar;
                    objConfCaja.VentaDolares = confCaja.TCVentaDolar;
                    objConfCaja.CompraEuros = confCaja.TCCompraEuro;
                    objConfCaja.VentaEuros = confCaja.TCVentaEuro;
                    objConfCaja.FechaCreacion = DateTime.Now;
                    objConfCaja.UsuarioCreacion = "Admin";

                    db.Caja.Add(objConfCaja);
                    db.SaveChanges();
                    CodResult = 1;
                }
            }
            catch (Exception)
            {
                CodResult = 0;
            }
            return CodResult;
        }

    }
}
