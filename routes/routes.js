const express = require('express');
const router = express.Router();

// Importar controladores
const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

// Middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function() {

    /* En este ejemplo se utilizan los lineamientos para crear una REST API */

    /** CLIENTES */
    // Agrega nuevos clientes via POST
    router.post('/clientes', 
        auth,
        clientesController.nuevoCliente
    );

    // Obtener todos los clintes via GET
    router.get('/clientes', 
        auth,
        clientesController.mostrarClientes
    );

    //Obtener un cliente específico via GET/Parametro
    router.get('/clientes/:idCliente', 
        auth,
        clientesController.mostrarCliente
    );

    // Actualizar cliente via PUT
    router.put('/clientes/:idCliente', 
        auth,
        clientesController.actualizarCliente
    );

    // Eliminar un cliente via DELETE
    router.delete('/clientes/:idCliente', 
        auth,
        clientesController.eliminarCliente
    );

    /** PRODUCTOS */
    // Nuevo producto via POST
    router.post('/productos', 
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );
    
    // Mostrar productos via GET
    router.get('/productos', 
        auth,
        productosController.mostrarProductos
    );

    // Mostrar un producto por ID via GET
    router.get('/productos/:idProducto', 
        auth, 
        productosController.mostrarProducto
    );

    // Actualizar un producto por su ID via PUT
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );
    
    // Eliminar un producto por ID via DELETE
    router.delete('/productos/:idProducto', 
        auth,
        productosController.eliminarProducto
    );

    // Búsqueda de productos
    router.post('/productos/busqueda/:query', 
        auth,
        productosController.buscarProducto
    );

    /** PEDIDOS */
    // Agregar un nuevo pedido via POST
    router.post('/pedidos/nuevo/:idUsuario', 
        auth,
        pedidosController.nuevoPedido
    );

    // Mostrar todos los pedidos via GET
    router.get('/pedidos', 
        // auth,
        pedidosController.mostrarPedidos
    );

    // Mostrar un pedido por ID via GET
    router.get('/pedidos/:idPedido', 
        auth,
        pedidosController.mostrarPedido
    );

    // Actualizar un pedido por ID via PUT
    router.put('/pedidos/:idPedido', 
        auth,
        pedidosController.actualizarPedido
    );

    // Eliminar un pedido por ID via DELETE
    router.delete('/pedidos/:idPedido', 
        auth,
        pedidosController.eliminarPedido
    );


    /** USUARIOS */
    router.post('/crear-cuenta', usuariosController.registrarUsuario);

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}