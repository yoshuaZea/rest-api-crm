const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

exports.registrarUsuario = async (req, res) => {

   // Leer datos del usuario y coloralos en el modelo
    const usuario = new Usuarios(req.body);

    // Hashear password
    usuario.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));

    try {
        await usuario.save();
        res.json({ mensaje: 'Usuario creado correctamente' });

    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error' });
    }   
}

exports.autenticarUsuario = async (req, res, next) => {
    // Buscar un usuario
    const { email, password } = req.body;

    const usuario = await Usuarios.findOne({ email });

    if(!usuario){
        // Si no existe el usuario
        await res.status(401).json({ mensaje: 'El usuario no existe' });
        next();

    } else {
        // Si el usuario existe, verificar el password 
        if(!bcrypt.compareSync(password, usuario.password)){
            // Si el password es incorrecto
            await res.status(401).json({ mensaje: 'Password incorrecto' });
            next();

        } else {
            // Password correcto, firmar el token con una llave secreta
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                _id: usuario._id
            }, 
                'LLAVESECRETA',// La llave debe coincidir al verificar el token
            {
                expiresIn: '1800000' // Poner 1h
            }); 

            res.json({ token });
        }
    }
}