#Imports
from flask import Flask, request, jsonify

#Instancia de flask con el nombre de la variable especial __name__ del modulo
app = Flask(__name__)

@app.route('/')
def status():
    return jsonify(
        mensaje = 'Servidor Corriendo',
        status = 200
    )

#Autenticación de Usuarios
@app.route('/login', methods=['POST'])
def login():
    return jsonify(
        mensaje = 'POST login',
        status = 200
    )

#Ingreso de Productos
@app.route('/producto', methods=['POST'])
def producto():
    return jsonify(
        mensaje = 'POST producto',
        status = 200
    )
    
#Obtener Productos Registrados    
@app.route('/productos', methods=['GET'])
def productos():
    return jsonify(
        mensaje = 'GET productos',
        status = 200
    )

#Entrypoint cuando es ejecutado app.py
if __name__ == "__main__":
    app.run(debug=True)