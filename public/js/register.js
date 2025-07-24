    document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('subscriptionForm');
            const alertBox = document.getElementById('alertBox');
            const submitBtn = document.getElementById('submitBtn');
            
            // Event listener para el formulario
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value.trim();
                
                // Validación básica
                if (!email) {
                    showAlert('Por favor ingresa un correo electrónico válido', 'error');
                    return;
                }
                
                if (!/^\S+@\S+\.\S+$/.test(email)) {
                    showAlert('El formato del correo electrónico no es válido', 'error');
                    return;
                }
                
                // Deshabilitar botón durante la solicitud
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Procesando...';
                
                // Llamada a método C# simulada mediante HTTP GET
                callCSharpMethod(email)
                    .then(response => {
                        showAlert(response.message, 'success');
                        form.reset();
                    })
                    .catch(error => {
                        showAlert(error.message || 'Ocurrió un error al procesar tu solicitud', 'error');
                    })
                    .finally(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Suscribirse';
                    });
            });
            
            // Función para mostrar alertas
            function showAlert(message, type) {
                alertBox.textContent = message;
                alertBox.className = `mt-4 p-4 rounded border fade-in ${type === 'success' ? 'alert-success' : 'alert-error'}`;
                alertBox.classList.remove('hidden');
                
                setTimeout(() => {
                    alertBox.classList.add('hidden');
                }, 5000);
            }
            
            // Función que simula la llamada al método C#
            function callCSharpMethod(email) {
                // En un caso real, esta sería la URL de tu endpoint C#
                const apiUrl = `https://api.tudominio.com/suscripcion/registrar?email=${encodeURIComponent(email)}`;
                
                // Simulamos la llamada HTTP GET
                return new Promise((resolve, reject) => {
                    // En producción usarías fetch o axios:
                    // return fetch(apiUrl).then(response => response.json());
                    
                    // Simulación de respuesta del backend C#
                    setTimeout(() => {
                        // Simulamos respuesta exitosa 80% del tiempo
                        if (Math.random() > 0.2) {
                            resolve({
                                success: true,
                                message: '¡Gracias por suscribirte! Hemos enviado un correo de confirmación.'
                            });
                        } else {
                            reject({
                                success: false,
                                message: 'El servicio de suscripciones no está disponible en este momento. Por favor intenta más tarde.'
                            });
                        }
                    }, 1500);
                });
            }
        });

