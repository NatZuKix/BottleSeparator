import {getWithExpiry} from "~/composables/utils/localStorageUtil"
async function getCoupons(type='active') {

    const runtimeConfig = useRuntimeConfig()
    const url = runtimeConfig.public.API_URL + "/coupons?type="+type

    
    const Token =getWithExpiry('Token')

    // Ensure Token exists before proceeding
    if (!Token) {
        console.error('No token found')
        return null
    }



    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`
            }
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

export { getCoupons }
