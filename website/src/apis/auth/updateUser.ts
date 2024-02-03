
export async function updateUser(role: number, data: object) {
    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/auth/update/" + role, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ ...data })
        })

        const dataRecieved = responce.json()
        return dataRecieved
    } catch (error) {
        return false
    }
}

