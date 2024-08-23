const request = require('supertest');
const app = require('../index');

describe('POST /usuario/registrar', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
        const res = await request(app)
            .post('/usuario/registrar')
            .send({
                nome: 'Itamar Alves',
                email: 'itamar@example.com',
                senha: 'senha123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('mensagem', 'Usuário registrado com sucesso');
    });
});

describe('POST /usuario/login', () => {
    it('deve fazer login com sucesso', async () => {
        const res = await request(app)
            .post('/usuario/login')
            .send({
                email: 'itamar@example.com',
                senha: 'senha123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});