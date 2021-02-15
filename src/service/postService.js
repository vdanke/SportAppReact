import { fetchAll } from "./commonMethodsService"

export default class PostService {

    fetchAllPosts = async (url) => {
        return fetchAll(url)
    }
}