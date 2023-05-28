//Creating the Fastify app and storing it in a variable
const fastify = require("fastify")({ logger: true });
//identifying the PORT that is going to be listem
const PORT = 3000;

fastify.register(require('@fastify/swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api'}
  },
})


//Instaling plugins created inside the project
const plugin = require('./routes/items')
fastify.register(plugin);



//Function that start the application.
const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`Server is listening on PORT ${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

//building and starting the server.
start();

