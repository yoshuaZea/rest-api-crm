const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Autorización por el header
    const authHeader = req.get('Authorization');

    // console.log(authHeader);

    if(!authHeader) {
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    // Obtener el token y verificarlo
    const token = authHeader.split(' ')[1];
    let revisarToken;

    try {
        // Validar la llave asignada en el controlador de usuario
        revisarToken = jwt.verify(token, 'LLAVESECRETA');

    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    
    // Si es un token válido, pero hay algún error
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    // Siguiente middleware
    next();
}