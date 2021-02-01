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
    public class OperacionController : Controller
    {
        OperacionNE objOperacion = new OperacionNE();
        UsuariosCLS objUsuarioCLS = new UsuariosCLS();
        // GET: Operacion
        public ActionResult Index()
        {
            
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;
            return View();
        }
        public ActionResult ListaOperaciones()
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            return View();
        }

        [HttpPost]
        public JsonResult CargaInicial()
        {
            var lstCargaInicial = objOperacion.CargaInicial();
            return Json(new { lstCargaInicial, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerConfCaja()
        {
            var lstConfCaja = objOperacion.ObtenerConfCaja();
            return Json(new { lstConfCaja, JsonRequestBehavior.AllowGet });
        }       

        [HttpPost()]
        public async Task<JsonResult> GuardarOperacion(OperacionCLS ope)
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ope.UsuarioCreacion = objUsuarioCLS.Usser;
            int codigoRpt = objOperacion.GuardarOperacion(ope);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerConfiguracionCaja()
        {
            var lstConfCaja = objOperacion.ObtenerConfiguracionCaja();
            return Json(new { lstConfCaja, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ListarOperacionesDay()
        {
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            var lstReporte = objOperacion.ListarOperaciones(objUsuarioCLS.Usser);
            return Json(new { lstReporte, JsonRequestBehavior.AllowGet });
        }
    }
}