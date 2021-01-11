using Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class CajaController : Controller
    {
        OperacionNE objOperacion = new OperacionNE();
        // GET: Caja
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult CargaInicial()
        {
            var lstCargaInicial = objOperacion.CargaInicial();
            return Json(new { lstCargaInicial, JsonRequestBehavior.AllowGet });
        }
    }
}