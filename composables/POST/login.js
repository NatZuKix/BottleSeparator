async function login(username, password) {

    const runtimeConfig = useRuntimeConfig()
    const url = runtimeConfig.public.API_URL + "/public/login"
    

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                username: username,
                password: password
            }),
        })

        // console.log('Data received:', data)

        if (response.status != 200) {
            console.error('Error fetching data')
            return null
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export { login }
