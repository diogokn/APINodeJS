import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabaseProgres {
    async list(search) {
        let videos

        if (search) {
            videos = sql`select * from videos where title ilike ${`%${search}%`} or description ilike ${`%${search}%`}`
        } else {
            videos = sql`select * from videos`
        }   
        return videos
    }

    async create(videos)
    {
        const id = randomUUID()
        console.log(id)
        await sql`insert into videos (id, title, description, duration) values (${id}, ${videos.title}, ${videos.description}, ${videos.duration})`
    }

    async udpate(id, videos)
    {
         await sql`update videos set title = ${videos.title}, description = ${videos.description}, duration = ${videos.duration} where id = ${id}`
         return sql`select * from videos where id = ${id}`.then(video => {
             return {
                 id: video[0].id,
                 title: video[0].title,
                 description: video[0].description,
                 duration: video[0].duration
             }
         })
    }

    async delete(id)
    {
         await sql`delete from videos where id = ${id}`
         return sql`select * from videos where id = ${id}`.then(video => {
             if (video.length > 0) {
                 return {
                     id: video[0].id,
                     title: video[0].title,
                     description: video[0].description,
                     duration: video[0].duration
                 }
             }
             return null
         })
    }
}       