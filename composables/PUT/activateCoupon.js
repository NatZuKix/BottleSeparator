
import {getWithExpiry} from "~/composables/utils/localStorageUtil"
async function activateCoupon(id) {

    const Token =getWithExpiry('Token')

    // Ensure Token exists before proceeding
    if (!Token) {
        console.error('No token found')
        return null
    }


    const runtimeConfig = useRuntimeConfig()
    const url = runtimeConfig.public.API_URL + "/coupon/"+id


    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`
            },
        })

        // console.log('Data received:', data)

        if (response.status == 404) {
            // console.error('Error callback api')
            return { status: 404, data: null }
        }


        if (response.status == 409) {
            // console.error('Error callback api')
            return { status: 409, data: null }
        }

        // const data = await response.json()
        // console.log(data);

        return { status: 200}

    } catch (error) {



        // console.error('Error fetching data:', error)
        return null
    }
}

export { activateCoupon }
