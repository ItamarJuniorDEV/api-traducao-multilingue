const axios = require('axios');

exports.traduzirTexto = async (req, res) => {
    const { texto, idiomaOrigem, idiomaDestino } = req.body;
    try {
        const response = await axios.post(process.env.LIBRETRANSLATE_URL, {
            q: texto,
            source: idiomaOrigem,
            target: idiomaDestino,
        });
        res.status(200).json({ traducao: response.data.translatedText });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro na tradução');
    }
};