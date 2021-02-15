export default class AuthService {

    _defaultUrl = "http://localhost:4545"

    login = async (url, body) => {
        const res = await fetch(`${this._defaultUrl}${url}`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        })
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return res
    }

    registration = async (body) => {
        let registrationUrl
        const userRole = body.role
        if (userRole === "coach") {
            registrationUrl = `${this._defaultUrl}/api/v1/coaches`
        } else {
            registrationUrl = `${this._defaultUrl}/api/v1/trainees`
        }
        const res = await fetch(registrationUrl, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        })

        if (res.status !== 201) {
            throw new Error(`Could not fetch ${registrationUrl}` +
            `, received ${res.status}`);
        }

        return res
    }
}