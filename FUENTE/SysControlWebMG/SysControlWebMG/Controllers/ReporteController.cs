using Entidades;
using Negocio;
using System.IO;
using System.Text;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class ReporteController : Controller
    {
        ReporteNE objReporte = new ReporteNE();
        UsuariosNE objUsuarios = new UsuariosNE();

        // GET: Reporte
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

        [HttpPost]
        public JsonResult GenerarReporte(FiltrosReporte objFiltro)
        {
            var lstReporte = objReporte.GenerarReporte(objFiltro);
            return Json(new { lstReporte, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public FileStreamResult Export(FiltrosReporte objFiltro)
        {
            
            var byteArray = Encoding.ASCII.GetBytes("Hola");
            var stream = new MemoryStream(byteArray);

            return File(stream, "application/ms-excel", "FileName.xls");

            //var cd = new ContentDisposition
            //{
            //    FileName = "YourFileName.xls",
            //    Inline = false
            //};
            //Response.AddHeader("Content-Disposition", cd.ToString());
            //return Content("Hola", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

    }
}