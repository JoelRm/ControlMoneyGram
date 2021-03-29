using Entidades;
using Negocio;
using System.IO;
using System.Text;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class ReporteCajaChicaController : Controller
    {
        ReporteCajaChicaNE objReporte = new ReporteCajaChicaNE();
        UsuariosNE objUsuarios = new UsuariosNE();
        // GET: ReporteCajaChica
        public ActionResult Index()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            var listaTipomov = objReporte.CargaInicial();
            listaTipomov.Insert(0, new CalatogoCLS { NombreItem = "TODOS", ValorItem = "0" });
            ViewBag.listaTipomov = listaTipomov;

            var listaUsuarios = objUsuarios.ListarUsuarios();
            listaUsuarios.Insert(0, new UsuariosCLS { Usser = "TODOS", NombreUsuario = "TODOS" });
            ViewBag.listaUsuarios = listaUsuarios;

            return View();
        }

        public ActionResult ReporteOperacionesCajaChica()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            var listaTipomov = objReporte.CargaInicial();
            listaTipomov.Insert(0, new CalatogoCLS { NombreItem = "TODOS", ValorItem = "0" });
            ViewBag.listaTipomov = listaTipomov;

            var listaUsuarios = objUsuarios.ListarUsuarios();
            listaUsuarios.Insert(0, new UsuariosCLS { Usser = "TODOS", NombreUsuario = "TODOS" });
            ViewBag.listaUsuarios = listaUsuarios;

            return View();
        }

        public ActionResult ReporteOperacionesCajaChicaCalculadora()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            var listaUsuarios = objUsuarios.ListarUsuarios();
            listaUsuarios.Insert(0, new UsuariosCLS { Usser = "TODOS", NombreUsuario = "TODOS" });
            ViewBag.listaUsuarios = listaUsuarios;
            return View();
        }

        public ActionResult ReporteGananciaCajaChica()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            return View();
        }

        public ActionResult ReporteCuadreCajaChica()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            return View();
        }

        [HttpPost]
        public JsonResult GenerarReporteGananciaCajaChica(FiltrosReporte objFiltro)
        {
            var lstReporteCajaChica = objReporte.GenerarReporteGananciaCajaChica(objFiltro);
            return Json(new { lstReporteCajaChica, JsonRequestBehavior.AllowGet });
        }


        [HttpPost]
        public JsonResult GenerarReporteOperacionesCajachica(FiltrosReporte objFiltro)
        {
            var lstReporteCajaChica = objReporte.GenerarReporteOperacionesCajachica(objFiltro);
            return Json(new { lstReporteCajaChica, JsonRequestBehavior.AllowGet });
        }


        [HttpPost]
        public JsonResult GenerarReporteCajaChicaCalculadora(FiltrosReporte objFiltro)
        {
            var lstReporteCajaChica = objReporte.GenerarReporteCajaChicaCalculadora(objFiltro);
            return Json(new { lstReporteCajaChica, JsonRequestBehavior.AllowGet });
        }


        //[HttpPost]
        //public FileStreamResult Export(FiltrosReporteCajaChica objFiltro)
        //{

        //    var byteArray = Encoding.ASCII.GetBytes("Hola");
        //    var stream = new MemoryStream(byteArray);

        //    return File(stream, "application/ms-excel", "FileName.xls");
        //}
    }
}