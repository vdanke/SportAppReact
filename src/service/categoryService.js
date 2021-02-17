import { fetchAll } from "./commonMethodsService"

export default class CategoryService {
    
    fetchAllCategories = async (url) => {
        return fetchAll(url)
    }
}