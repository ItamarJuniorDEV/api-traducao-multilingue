const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

exports.cache = (req, res, next) => {
    const { texto, idiomaOrigem, idiomaDestino } = req.body;
    const cacheKey = `${idiomaOrigem}:${idiomaDestino}:${texto}`;

    client.get(cacheKey, (err, data) => {
        if (err) throw err;

        if (data) {
            res.json({ traducao: data });
        } else {
            next();
        }
    });
};