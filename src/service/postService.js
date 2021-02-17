import { fetchAll } from "./commonMethodsService"

const _defaultUrl = "http://localhost:4545"

export default class PostService {

    fetchAllPosts = async (url) => {
        return fetchAll(url)
    }

    addPost = async (url, headers, body) => {
        const res = await fetch(`${_defaultUrl}${url}`, {
            headers: headers,
            body: body,
            method: "POST"
        })
        if (res.status !== 201) {
            throw new Error("Can't save new post")
        }
        return res
    }
}