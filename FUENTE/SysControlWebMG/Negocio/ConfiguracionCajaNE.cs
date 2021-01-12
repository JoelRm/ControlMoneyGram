using Datos.Clases;
using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class ConfiguracionCajaNE
    {
        private static ConfiguracionCajaDA obj = new ConfiguracionCajaDA();

        //public List<ConfiguracionCajaCLS> GuardarConfiguracion(ConfiguracionCajaCLS confCaja)
        //{
        //    return obj.GuardarConfiguracion(confCaja);
        //}

        public int GuardarConfiguracion(ConfiguracionCajaCLS confCaja)
        {
            return obj.GuardarConfiguracion(confCaja);
        }

    }
}
