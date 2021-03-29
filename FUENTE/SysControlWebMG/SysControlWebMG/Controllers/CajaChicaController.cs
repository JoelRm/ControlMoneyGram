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
            return View();
        }

        [HttpPost()]
        public async Task<JsonResult> GuardarConfiguracion(ConfiguracionCajaChicaCLS confCaja)
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            confCaja.UsuarioCreacion = objUsuarioCLS.Usser;
            int codigoRpt = objConfCaja.GuardarConfiguracion(confCaja);
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