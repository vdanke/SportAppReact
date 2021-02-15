import {fethcAllWithHeaders} from './commonMethodsService'

export default class CoachService {

    fetchAllCoaches = async (url, headers) => {
        return fethcAllWithHeaders(url, headers)
    }
}