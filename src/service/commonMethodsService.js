const _defaultUrl = "http://localhost:4545"

const fetchAll = async (url) => {
    const res = await fetch(`${_defaultUrl}${url}`)

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }
    return res
}

const fethcAllWithHeaders = async (url, headers) => {
    const res = await fetch(`${_defaultUrl}${url}`, {
        headers: headers,
        method: "GET"
    })

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }
    return res
}

export {
    fetchAll,
    fethcAllWithHeaders
}