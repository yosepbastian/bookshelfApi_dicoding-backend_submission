'use strict'

const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.Server({
        port: 9000,
        host: 'localhost',
    })

    await server.start();
    console.log(`Server berjalan pada port ${server.info.uri}`);
}

init()