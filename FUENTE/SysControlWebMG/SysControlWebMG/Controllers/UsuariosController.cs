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
            var listaRoles = objRol.ListarRolesForCombo();
            listaRoles.Insert(0, new Entidades.RolCLS { NombreRol = "SELECCIONE CARGO", IdRol = 0 });
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
            int codigoRpt = 1;// objUsuario.AgregarUnidad(und);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }

    }
}