const generateUniqueId = require('../utils/generateUniqueId')
const crypto = require('crypto');
const connection = require('../database/connection');
const enviarEmail = require('../utils/email');




module.exports = {

    async index(req,res) {
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return(enviarEmail(id, email), res.json({ id, email }));

        


    }


};


