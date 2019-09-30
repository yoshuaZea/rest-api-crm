const Pedidos = require('../models/Pedidos');


// Agregar un nuevo pedido
exports.nuevoPedido = async(req, res) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({ mensaje: 'Se agregó un nuevo pedido'} );

    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra todos los pedidos
exports.mostrarPedidos = async(req, res, next) => {
    try {
        // populate para relacionar el id con el de otra colección
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un pedido por ID
exports.mostrarPedido = async(req, res, next) => {
    try {
        const pedido = await Pedidos.findById({ _id: req.params.idPedido }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        
        if(!pedido){
            res.json({ mensaje: 'No existe el pedido'});
            return next();
        }

        // Mostrar el pedido
        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Actualizar pedido por ID
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findByIdAndUpdate({ _id: req.params.idPedido }, req.body, { new: true }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar un pedido via ID
exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.findByIdAndDelete({ _id: req.params.idPedido });
        res.json({ mensaje: 'El pedido se ha eliminado' });

    } catch (error) {
        console.log(error);
        next();
    }
}