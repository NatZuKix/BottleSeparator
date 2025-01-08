async function callback(code) {

    const runtimeConfig = useRuntimeConfig()
    const url = runtimeConfig.public.API_URL + "/public/auth/microsoft/callback"
    

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({code:code}),
        })

        // console.log('Data received:', data)

        if (response.status != 200) {
            console.error('Error callback api')
            return null
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export { callback }
