const Hapi = require('@hapi/hapi');
const routes = require('./route');


const init = async () => {
    const server = Hapi.Server({
        port: 9000,
        host: 'localhost',
    })
    server.route(routes);
    
    await server.start();
    console.log(`Server berjalan pada port ${server.info.uri}`);
}

init()