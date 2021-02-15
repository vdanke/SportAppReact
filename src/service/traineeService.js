import { fethcAllWithHeaders } from "./commonMethodsService"

const _defaultUrl = "http://localhost:4545"

export default class TraineeService {

    fetchAllTrainees = async (url, headers) => {
        return fethcAllWithHeaders(url, headers)
    }

    fetchTraineeCabinet = async (url, headers) => {
        return fethcAllWithHeaders(url, headers)
    }

    updateTrainee = async (url, headers, body) => {
        const res = await fetch(`${_defaultUrl}${url}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            throw new Error()
        }
        return res
    }
}