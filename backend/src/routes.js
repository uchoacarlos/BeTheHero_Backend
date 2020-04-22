const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController =  require('./controllers/OngController');
const ProfileController =  require('./controllers/ProfileController');
const IncidentController =  require('./controllers/IncidentController');
const SessionController =  require('./controllers/SessionController');


const routes = express.Router();

/* -- Rotas -- */

// -- Login -- //
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);

// -- Ongs -- //
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

// -- Incidents  da mesma instituição-- //
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

// -- Incidents -- //
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(2).max(20),
        description: Joi.string().required().min(10),
        value: Joi.number().required()
    }),

    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }).unknown(),

}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);




module.exports = routes;