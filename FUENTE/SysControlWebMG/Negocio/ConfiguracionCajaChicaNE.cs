using Datos.Clases;
using Entidades;

namespace Negocio
{
    public class ConfiguracionCajaChicaNE
    {
        private static ConfiguracionCajaChicaDA obj = new ConfiguracionCajaChicaDA();

        //public List<ConfiguracionCajaCLS> GuardarConfiguracion(ConfiguracionCajaCLS confCaja)
        //{
        //    return obj.GuardarConfiguracion(confCaja);
        //}

        public int GuardarConfiguracion(ConfiguracionCajaChicaCLS confCajaChica)
        {
            return obj.GuardarConfiguracion(confCajaChica);
        }

        public ConfiguracionCajaChicaCLS ObtenerUltimaConfCajaChica()
        {
            return obj.ObtenerUltimaConfCajaChica();
        }
    }
}
