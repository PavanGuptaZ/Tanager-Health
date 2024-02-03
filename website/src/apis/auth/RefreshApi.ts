export default async function refreshApiFunction() {
    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/auth/refresh", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
        })

        const dataRecieved = responce.json()
        return dataRecieved
    } catch (error) {
        return { status: 'error', message: "Fetching error" }
    }
}
