using Microsoft.AspNetCore.Mvc;

namespace panacea.Controllers
{
    [ApiController]
    [Route("api/registrar")]
    public class RegistroController : ControllerBase
    {
        // Modelo que recibe los datos del registro
        public class RegistroRequest
        {
            public string Usuario { get; set; }
            public string Email { get; set; }
            public string Contrasena { get; set; }
        }

        [HttpPost]
        public IActionResult Registrar([FromBody] RegistroRequest request)
        {
            Console.WriteLine("Registro en curso...");
            //System.Diagnostics.Debugger.Break();

            // Validación básica
            if (string.IsNullOrWhiteSpace(request.Usuario) &&
                string.IsNullOrWhiteSpace(request.Email) &&
                string.IsNullOrWhiteSpace(request.Contrasena))
            {
                return BadRequest(new { mensaje = "Todos los campos son obligatorios." });
            }

            // Acá podrías guardar en la base de datos
            // Por ahora solo devolvemos un mensaje de éxito

            return Ok(new
            {
                mensaje = "Registro exitoso",
                usuario = request.Usuario,
                email = request.Email
            });
        }
    }
}