export async function getPersonsList() {
    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/person", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
        })
        const dataRecieved = await responce.json()
        return dataRecieved

    } catch (error) {
        return { status: 'error', message: "Fetching error" }
    }
}

export async function getPersonsById(id?: number | string) {
    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/person/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
        })
        const dataRecieved = await responce.json()
        return dataRecieved

    } catch (error) {
        return { status: 'error', message: "Fetching error" }
    }
}
