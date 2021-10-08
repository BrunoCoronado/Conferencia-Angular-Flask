#Imports
from flask import Flask, request, jsonify

#Variables globales
usuarios = [
        {
            'usuario': 'admin',
            'password': '123456',
            'rol': 1,
        },
        {
            'usuario': 'cliente',
            'password': '123456',
            'rol': 2,
        },
    ]
productos = []

#Instancia de flask con el nombre de la variable especial __name__ del modulo
app = Flask(__name__)

@app.route('/')
def status():
    return jsonify(
        usuarios = usuarios,
        mensaje = 'Servidor Corriendo',
        status = 200
    )

"""Autenticación de Usuarios"""
@app.route('/login', methods=['POST'])
def login():
    try:
        #Buscamos el usuario por nombre dentro del arreglo, si no existe retorna None
        usuario = next((u for u in usuarios if u["usuario"] == request.json['usuario']), None)

        #Si el usuario encontrado es distinto de None y la contraseña coincide
        if usuario is not None and usuario["password"] == request.json['password']:
            #retornamos la metadata del usuario y un estado 200 (ok)
            return jsonify(
                usuario = usuario['usuario'],
                rol = usuario['rol'],
                mensaje = 'Bienvenido al Sistema!',
                status = 200
            )

        #retornamos estado 404 (not found) y un mensaje de error
        return jsonify(
            mensaje = 'Usuario o contraseña inválidas',
            status = 404
        )
    except Exception as e:
        print(e)
        #retornamos estado 400 (Bad request) y un mensaje de error
        return jsonify(
            mensaje = 'Ocurrio un error desconocido',
            status = 400
        )

"""Ingreso de Productos"""
@app.route('/producto', methods=['POST'])
def producto():
    try:
        #Agregamos un producto al arreglo con los datos de la petición
        productos.append(
                {
                    "nombre": request.json['nombre'],
                    "precio": request.json['precio'],
                    "imagen": request.json['imagen'],
                }
            )

        #retornamos estado 200 (ok) y un mensaje
        return jsonify(
            mensaje = 'Producto Creado con éxito',
            status = 200
        )
    except Exception as e:
        print(e)
        #retornamos estado 400 (Bad request) y un mensaje de error
        return jsonify(
            mensaje = 'Ocurrio un error desconocido',
            status = 400
        )

"""Obtener Productos Registrados"""
@app.route('/productos', methods=['GET'])
def obtenerProductos():
    try:
        #Retornamos todos los productos
        return jsonify(
            productos = productos,
            status = 200
        )
    except Exception as e:
        print(e)
        #retornamos estado 400 (Bad request) y un mensaje de error
        return jsonify(
            mensaje = 'Ocurrio un error desconocido',
            status = 400
        )

"""Entrypoint cuando es ejecutado app.py"""
if __name__ == "__main__":
    app.run(debug=True)