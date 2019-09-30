const Clientes = require('../models/Clientes');

// Crear un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);
    
    try {
        // Almacenar registro
        await cliente.save();
        res.json({ mensaje: 'Se agregó un nuevo cliente'});

    } catch (error) {
        // Si hay error, console.log y next
        res.send(error);
        next();
    }
}

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);

    } catch (error) {
        res.send(error);
        next();
    }
}

// Muestra un cliente por su ID
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    // Si no existe
    if(!cliente){
        res.json({ mensaje: 'No se encontró el cliente' });
        next();
    }

    // Mostrar el cliente
    res.json(cliente);
}

// Actualizar cliente por su ID
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findByIdAndUpdate(
            {  
                _id: req.params.idCliente
            }, 
            req.body, {
                new: true // Actualizar todos los campos
            }
        );

        res.json(cliente);

    } catch (error) {
        res.send(error);
        next();
    }
}

// Eliminar un cliente por su ID
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findByIdAndDelete({ _id: req.params.idCliente });

        res.json({ mensaje: 'El cliente se ha eliminado' });

    } catch (error) {
        res.send(error);
        next();
    }
}