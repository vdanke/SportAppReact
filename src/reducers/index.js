const initialState = {
    loading: true,
    token: "",
    role: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_LOADED":
            return {
                ...state,
                token: action.token,
                role: action.role
            }
        case "LOGOUT":
            return {
                ...state,
                token: action.token,
                role: action.role
            }
        case "USER_UPDATE_WITH_TOKEN":
            return {
                ...state,
                token: action.token,
                role: action.role
            }      
        default:
            return state 
    }
}

export default reducer