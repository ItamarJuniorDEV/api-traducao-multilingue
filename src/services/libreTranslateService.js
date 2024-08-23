const axios = require('axios');

exports.traduzirTexto = async (texto, idiomaOrigem, idiomaDestino) => {
    try {
        const response = await axios.post(process.env.LIBRETRANSLATE_URL, {
            q: texto,
            source: idiomaOrigem,
            target: idiomaDestino,
        });
        return response.data.translatedText;
    } catch (error) {
        console.error(`Erro na tradução: ${error.message}`);
        throw error;
    }
};