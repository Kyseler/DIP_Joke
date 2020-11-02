const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router
    .get('/api/jokes', async (request, response) => {
        try {
            let jokes = await controller.getJokes();
            response.send(jokes);
        } catch (e) {
            sendStatus(e, response);
        }
    })

    .get('/api/othersites', async (request, response) => {
        try {
            let jokes = await controller.getJokes();
            response.send(jokes);
        } catch (e) {
            sendStatus(e, response);
        }
    })

    .get('/api/otherjokes/:site', async (request, response) => {
        try {  
            let jokes = await controller.getJokes();
            response.send(jokes);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .post('/api/jokes', async (request, response) => {
            try {
                let {setup, punchline} = request.body;
                await controller.createJoke(setup, punchline);
                response.send({message: 'Joke saved!'});
            } catch (e) {
                sendStatus(e, response);
            }
        }
    );

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;

// async function createjokefunc(){
//     await controller.createJoke('Ulrik', 'Test punchline')
// }

// createjokefunc()