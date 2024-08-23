const request = require('supertest');
const app = require('../index');
const jwt = require('jsonwebtoken');

describe('POST /traduzir', () => {
    let token;

    beforeAll(() => {
        const payload = { user: { id: 'testUserId' } };
        token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('deve traduzir um texto com sucesso', async () => {
        const res = await request(app)
            .post('/traduzir')
            .set('Authorization', `Bearer ${token}`)
            .send({
                texto: 'Hello',
                idiomaOrigem: 'en',
                idiomaDestino: 'pt'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('traducao');
    });

    it('deve falhar se o token JWT estiver ausente', async () => {
        const res = await request(app)
            .post('/traduzir')
            .send({
                texto: 'Hello',
                idiomaOrigem: 'en',
                idiomaDestino: 'pt'
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('mensagem', 'Acesso não autorizado');
    });
});