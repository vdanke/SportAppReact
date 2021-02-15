const userLoaded = (token, role) => {
    return {
        type: "USER_LOADED",
        token: token,
        role: role
    }
}

const updateUserWithToken = (token, role) => {
    return {
        type: "USER_UPDATE_WITH_TOKEN",
        token: token,
        role: role
    }
}

const logout = () => {
    return {
        type: "LOGOUT",
        token: "",
        role: ""
    }
}

export {
    userLoaded,
    logout,
    updateUserWithToken
}