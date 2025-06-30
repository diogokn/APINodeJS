import { fastify } from "fastify";
//import { DatabaseMemory } from "./database-memory.js";
import { DatabaseProgres } from "./database-progres.js";

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabaseProgres()

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration
    }); 

    return reply.status(201).send({
        message: 'Video created successfully',
    });

});

server.get('/', async (request, reply) => {
    return { message: 'Hello, hello!' }
});

server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list(search)
    //console.log(videos)
    return videos
});

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;  

    await database.udpate(videoId, {
            title,
            description,
            duration
        }); 

    return reply.status(200).send({
        message: 'Video updated successfully',
    }); 

});

server.delete('/videos/:id', async (request, reply) => {
 const videoId = request.params.id;
    await database.delete(videoId);

    return reply.status(200).send({
        message: 'Video deleted',
    }); 
});


server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
