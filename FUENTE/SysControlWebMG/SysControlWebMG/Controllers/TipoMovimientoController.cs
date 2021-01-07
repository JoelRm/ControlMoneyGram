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