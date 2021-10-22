const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const fs = require('fs')
const path = require('path')

const PORT = 3000
const CORS_OPTIONS = { origin: true, optionsSuccessStatus: 200 };

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.urlencoded({limit: '15mb', extended: true}))
app.use(express.json({limit: '15mb', extended: true}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Servicio en linea')
})

app.post('/login', (req, res) => {
    try {
        let index_usuario = usuarios.map(u => u.usuario).indexOf(req.body.usuario)
        if(index_usuario == -1){
            res.status(200).json({mensaje: 'Nombre de usuario inválido', status: 404})
            return
        }

        if(usuarios[index_usuario].password != req.body.password){
            res.status(200).json({mensaje: 'Password incorrecto', status: 404})
            return
        }

        res.status(200).json({mensaje: 'Bienvenido al Sistema!', status: 200, rol: usuarios[index_usuario].rol})

    } catch (error) {
        console.log(error)
        res.status(200).json({mensaje: 'Ocurrio un error', status: 400})
    }
})

app.post('/producto', (req, res) => {
    try {
        if(req.body.imagen){
            let match =  req.body.imagen.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            let contenido =  Buffer.from(match[2],'base64');
            let nombre = `producto_${productos.length}.jpg`
            fs.writeFile(
                path.join(__dirname,'..', 'assets', `producto_${productos.length}.jpg`), 
                contenido, 
                (err) => {
                    if(err){
                        res.status(200).json({mensaje: 'Ocurrio un error al guardar imagen'})
                        return
                    }            
                    productos.push({
                        nombre: req.body.nombre,
                        precio: req.body.precio,
                        nombre_imagen: nombre
                    })
                    res.status(200).json({mensaje: 'Producto creado con éxito', status: 200})
                }
            );
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({mensaje: 'Ocurrio un error'})
    }
}
)
app.get('/productos', (req, res) => {
    try {
        let tmp_productos = []
        productos.forEach((p, i) => {
            let archivo = fs.readFileSync(path.join(__dirname,'..', 'assets', p.nombre_imagen), { encoding: 'base64' });
            p.imagen = `data:application/jpg;base64,${archivo}`
            tmp_productos.push(p)
        });
        res.status(200).json({
            productos: tmp_productos,
            status: 200
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({mensaje: 'Ocurrio un error'})
    }
})

app.get('/descargar/:index', (req, res) => {
    try {
        res.download(path.join(__dirname,'..', 'assets', `producto_${req.params.index}.jpg`))
    } catch (error) {
        console.log(error)
        res.status(200).json({mensaje: 'Ocurrio un error'})
    }
}
)
app.get('/producto/:index', (req, res) => {
    try {
        res.sendFile(path.join(__dirname,'..', 'assets', `producto_${req.params.index}.jpg`))
    } catch (error) {
        console.log(error)
        res.status(200).json({mensaje: 'Ocurrio un error'})
    }
})


app.listen(PORT, () => {
    console.log(`Servicio corriendo en http://localhost:${PORT}`)
})


let usuarios = [
    {
        usuario: 'admin',
        password: '123456',
        rol: 1,
    },
    {
        usuario: 'cliente',
        password: '123456',
        rol: 2,
    },
]

let productos = []
