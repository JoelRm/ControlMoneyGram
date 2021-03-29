using Entidades;
using Negocio;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class OperacionCajaChicaController : Controller
    {
        OperacionCajaChicaNE objOperacion = new OperacionCajaChicaNE();
        UsuariosCLS objUsuarioCLS = new UsuariosCLS();
        OperacionNE objOpe = new OperacionNE();
        
        public ActionResult Index()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;
            return View();
        }

        [HttpPost]
        public JsonResult CargaInicial()
        {
            var lstCargaInicial = objOpe.CargaInicial();
            return Json(new { lstCargaInicial, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerConfCajaChica()
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            var lstConfCajaChica = objOperacion.ObtenerConfCajaChica(objUsuarioCLS.Usser);
            return Json(new { lstConfCajaChica, JsonRequestBehavior.AllowGet });
        }

        public ActionResult CuadreCajaChica()
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            return View();
        }

        [HttpPost()]
        public async Task<JsonResult> GuardarOperacionCajaChica(OperacionCajaChicaCLS ope)
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ope.UsuarioCreacion = objUsuarioCLS.Usser;
            int codigoRpt = objOperacion.GuardarOperacionCajaChica(ope);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost()]
        public async Task<JsonResult> GuardarOperacionCajaChicaCalculadora(CalculadoraCLS ope)
        {
            int codigoRpt = objOperacion.GuardarOperacionCajaChicaCalculadora(ope);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        public ActionResult VerOperacionesCajaChica()
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            return View();
        }

        public ActionResult VerOperacionesCajaChicaCalculadora()
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;
            return View();
        }

        [HttpPost]
        public JsonResult ObtenerListaOperacionesCajaChica()
        {
            var lstOperacionesCajaChica = objOperacion.ObtenerListaOperacionesCajaChica();
            return Json(new { lstOperacionesCajaChica, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerListaOperacionesCajaChicaCalculadora()
        {
            var lstOperacionesCajaChica = objOperacion.ObtenerListaOperacionesCajaChicaCalculadora();
            return Json(new { lstOperacionesCajaChica, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult AnularOperacionCajaChica(int idOperacion)
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            var Code = objOperacion.AnularOperacionCajaChica(idOperacion, objUsuarioCLS.Usser);
            return Json(new { Code, JsonRequestBehavior.AllowGet });
        }

    }
}