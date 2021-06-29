using Entidades;
using Negocio;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class CajaChicaController : Controller
    {
        ConfiguracionCajaChicaNE objConfCaja = new ConfiguracionCajaChicaNE();

        // GET: CajaChica
        public ActionResult Index()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            //ConfiguracionCajaChicaCLS objConf = new ConfiguracionCajaChicaCLS();
            //objConf = (ConfiguracionCajaChicaCLS)HttpContext.Session["CajaChicaActualSoles"];
            //ViewBag.CajaChicaActualSoles = objConf;

            return View();
        }

        [HttpPost()]
        public async Task<JsonResult> GuardarConfiguracion(ConfiguracionCajaChicaCLS confCajaChica)
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            confCajaChica.UsuarioCreacion = objUsuarioCLS.Usser;
            int codigoRpt = objConfCaja.GuardarConfiguracion(confCajaChica);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerUltimaConfCajaChica()
        {
            var lstConfCajaChica = objConfCaja.ObtenerUltimaConfCajaChica();
            return Json(new { lstConfCajaChica, JsonRequestBehavior.AllowGet });
        }
    }
}