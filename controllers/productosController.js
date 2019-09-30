const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

// Configuración de multer
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'));
        }
    }
}

// Pasar la configuración y el campo 
const upload = multer(configuracionMulter).single('imagen');

// Subir un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            res.json({ mensaje: error });
        }

        return next();

    });
}

// Agregar nuevo producto
exports.nuevoProducto = async(req, res, next) => {
    const producto = new Productos(req.body);
    try {
        // Validar si hay imagen
        if(req.file){
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({ mensaje: 'Se agrego un nuevo producto '});

    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar productos
exports.mostrarProductos = async(req, res, next) => {
    try {
        // Obtener datos de los productos
        const productos = await Productos.find({});
        res.json(productos);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un producto por su ID
exports.mostrarProducto = async(req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    // Si no existe el producto
    if(!producto){
        res.json({ mensaje: 'El producto no existe '});
    }

    // Mostrar el producto
    res.json(producto);
}

// Actualizar un producto por su ID
exports.actualizarProducto = async(req, res, next) => {
    try {
        // Construir el nuevo producto
        let productoActualizar = req.body;
        
        // Verificar si hay imagen nueva
        if(req.file){
            productoActualizar.imagen = req.file.filename;
        } else {
            let productoActual = await Productos.findById(req.params.idProducto);
            productoActualizar.imagen = productoActual.imagen;
        }
        
        let producto = await Productos.findByIdAndUpdate({ _id: req.params.idProducto },
            productoActualizar, {
                new: true,
        });
        
        res.json(producto);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar un producto por su ID
exports.eliminarProducto = async(req, res, next) => {
    try {
        const producto = await Productos.findByIdAndDelete({ _id: req.params.idProducto });

        if(producto){
            const imagenAnteriorPath = __dirname + `/../uploads/${producto.imagen}`;

            //Eliminar archivo con filesystem
            fs.unlink(imagenAnteriorPath, (error) => {
                if(error){
                    res.json(error);
                    return;
                }
            });
        }

        res.json({ mensaje: 'El producto se ha eliminado' });

    } catch (error) {
        console.log(error);
        next();
    }
}

// Buscar producto
exports.buscarProducto = async (req, res, next) => {
    try {
        // Obtener el query
        const { query } = req.params;

        const producto = await Productos.find({ nombre: new RegExp(query, 'i') });
        
        res.json(producto);

    } catch (error) {
        console.log(error);
        next();
    }
}