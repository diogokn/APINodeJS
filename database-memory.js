import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries()).map((videoArray) =>{
            const id = videoArray[0] // Get the ID from the entry
            const video = videoArray[1] // Get the video object from the entry  

            return {
                id, // Include the ID in the returned object
                ...video // Spread the video properties into the returned object
            }       
        })
        .filter(video => {
            if (search) {
                return video.title.toLowerCase().includes(search.toLowerCase()) ||
                       video.description.toLowerCase().includes(search.toLowerCase())
            }

            return true
        })  
    }

    create(videos)
    {
        const id = crypto.randomUUID()
        this.#videos.set(id, videos) // Store the videos with a unique ID
        //return id
    }

    udpate(id, videos)
    {
        this.#videos.set(id, videos) // Update the video with the given ID
        //return this.videos.get(id) // Return the updated video  
    }

    delete(id)
    {
        //const video = this.#videos.get(id) // Get the video with the given ID
        this.#videos.delete(id) // Delete the video from the Map
        //return video // Return the deleted video
    }
}       