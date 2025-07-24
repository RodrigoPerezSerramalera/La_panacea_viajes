from flask import Flask, render_template, request, redirect, url_for, flash
import psycopg2
from werkzeug.security import generate_password_hash

app = Flask(__name__)
app.secret_key = 'clave_secreta_segura'  # Necesaria para usar flash()

# CONEXIÓN A LA BASE DE DATOS
conn = psycopg2.connect(
    host="localhost",
    database="postgres",        # Cambiá si usás otra
    user="postgres",
    password="0712"    
)
cur = conn.cursor()

# RUTA DE REGISTRO
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        password_hash = generate_password_hash(password)

        # Verificar si ya existe
        cur.execute("SELECT * FROM usuarios WHERE username = %s OR email = %s", (username, email))
        existente = cur.fetchone()

        if existente:
            flash('El usuario o el email ya están registrados.')
            return redirect(url_for('register'))

        # Guardar nuevo usuario
        cur.execute("INSERT INTO usuarios (username, email, password_hash) VALUES (%s, %s, %s)",
                    (username, email, password_hash))
        conn.commit()
        flash('¡Registro exitoso! Ahora podés iniciar sesión.')
        return redirect(url_for('register'))  # O redireccioná a /login si lo tenés

    return render_template('register.html')

# INICIO
@app.route('/')
def home():
    return '<h1>¡Hola! Página principal funcionando.</h1>'

if __name__ == '__main__':
    app.run(debug=True)
