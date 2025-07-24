using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// ✅ Agregamos soporte para controladores (lo que te estaba faltando)
builder.Services.AddControllers();

var app = builder.Build();

// ✅ Establece que los archivos estáticos vienen de /public
app.UseStaticFiles();

// ✅ Sirve index.html automáticamente desde /public
app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "public")),
    RequestPath = "",
    DefaultFileNames = new[] { "index.html" }
});

// ✅ Sirve todos los archivos estáticos desde /public
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "public")),
    RequestPath = ""
});

// ✅ Activa los endpoints de controladores (como /api/registrar)
app.MapControllers();

app.Run();
