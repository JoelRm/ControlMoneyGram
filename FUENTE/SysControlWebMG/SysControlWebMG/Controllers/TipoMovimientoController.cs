using Entidades;
using Negocio;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class TipoMovimientoController : Controller
    {
        TipoMovimientoNE objTipoMov = new TipoMovimientoNE();
        // GET: TipoOperacion
        public ActionResult Index()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;
            return View();
        }

        [HttpPost]
        public JsonResult ListarTipoMovimiento()
        {
            var lstTipoMov = objTipoMov.ListarTipoMovimiento();
            return Json(new { lstTipoMov, JsonRequestBehavior.AllowGet });
        }

    }
}