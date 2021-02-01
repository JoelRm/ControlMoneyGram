using Entidades;
using Negocio;
using System.Web.Mvc;

namespace SysControlWebMG.Controllers
{
    public class UsuariosController : Controller
    {
        UsuariosNE objUsuario = new UsuariosNE();
        RolNE objRol = new RolNE();
        // GET: Usuarios
        public ActionResult Index()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            var listaRoles = objUsuario.CargaInicial();
            listaRoles.Insert(0, new CalatogoCLS { NombreItem = "SELECCIONE CARGO", ValorItem = "0" });
            ViewBag.listaRoles = listaRoles;

            return View();
        }

        [HttpPost]
        public JsonResult ListarUsuarios()
        {
            var lstUsuarios = objUsuario.ListarUsuarios();
            return Json(new { lstUsuarios, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult AgregarUsuario(UsuariosCLS usu)
        {
            int codigoRpt = objUsuario.AgregarUsuario(usu);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult CambiarEstadoUsuario(UsuariosCLS usu)
        {
            var codigRpt = objUsuario.CambiarEstadoUsuario(usu);
            return Json(new { Code = codigRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult ObtenerUsuarioPorId(int usu)
        {
            var usuarioCLS = objUsuario.ObtenerUsuarioPorId(usu);
            return Json(new { usuarioCLS, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult EditarUsuario(UsuariosCLS usu)
        {
            int codigoRpt = objUsuario.EditarUsuario(usu);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public JsonResult EliminarUnidad(UsuariosCLS usu)
        {
            int codigoRpt = objUsuario.EliminarUsuario(usu);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }
    }
}