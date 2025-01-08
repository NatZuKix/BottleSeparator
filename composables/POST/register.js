async function register(username,fullname, password,cfPassword) {

    const runtimeConfig = useRuntimeConfig()
    const url = runtimeConfig.public.API_URL + "public/register"
    

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation:cfPassword,
                name:fullname
            }),
        })

        // console.log('Data received:', data)

        if (response.status != 200) {
            console.error('Error fetching data')
            return null
        }

        return response

    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export { register }
