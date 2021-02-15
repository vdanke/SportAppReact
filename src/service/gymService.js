import { fetchAll } from "./commonMethodsService"

export default class GymService {

    fetchAllGyms = async (url) => {
        return fetchAll(url)
    }
}