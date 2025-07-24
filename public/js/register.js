document.addEventListener("DOMContentLoaded", function () {
    // Obtener el botón de submit por ID
    const submitButton = document.getElementById("registerBtn");

    // Agregar el evento click
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Obtener valores de los inputs
        const usuario = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const contrasena = document.getElementById("password").value;

        // Validación básica
        if (!usuario || !email || !contrasena) {
            alert("Por favor completa todos los campos.");
            return;
        }

        // Armar el objeto de datos
        const data = {
            usuario: usuario,
            email: email,
            contrasena: contrasena
        };

        // Enviar datos con fetch (POST)
        fetch("http://localhost:5000/api/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error en la solicitud.");
                }
                return response.json();
            })
            .then(result => {
                console.log("Registro exitoso:", result);
                alert("Registro exitoso.");
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Hubo un error al registrar.");
            });
    });
});

