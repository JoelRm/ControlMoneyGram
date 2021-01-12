using Entidades;
using Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class CajaController : Controller
    {
        ConfiguracionCajaNE objConfCaja = new ConfiguracionCajaNE();
        // GET: Caja
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost()]
        public async Task<JsonResult> GuardarConfiguracion(ConfiguracionCajaCLS confCaja)
        {
            int codigoRpt = objConfCaja.GuardarConfiguracion(confCaja);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

    }
}