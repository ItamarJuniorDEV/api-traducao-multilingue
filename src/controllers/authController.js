const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para registro de usuário
exports.registrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        let usuario = await User.findOne({ email });
        if (usuario) {
            return res.status(400).json({ mensagem: 'Usuário já registrado' });
        }
        usuario = new User({ nome, email, senha });
        const salt = await bcrypt.genSalt(10);
        usuario.senha = await bcrypt.hash(senha, salt);
        await usuario.save();
        res.status(201).json({ mensagem: 'Usuário registrado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Controlador para login de usuário
exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        let usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos' });
        }
        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if (!isMatch) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos' });
        }
        const payload = { user: { id: usuario.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};