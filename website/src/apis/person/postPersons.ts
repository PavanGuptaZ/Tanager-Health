export async function postPersons(data: {
    profileIcon: number;
    name: string;
    relation: string;
    dateOfBirth: string;
    _id?: string | number
}) {
    try {
        const { _id, ...rem } = data;
        const postLink = _id ? `/person/${_id}` : "/person";
        const method = _id ? "PATCH" : "POST";

        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + postLink, {
            method: method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(rem)
        })
        const dataRecieved = responce.json()
        return dataRecieved
    } catch (error) {
        return { status: 'error', message: "Posting error" }
    }
}
