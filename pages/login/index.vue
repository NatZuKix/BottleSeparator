<script setup>

import { login } from "~/composables/POST/login"
import { getTokenPayload } from "~/composables/utils/jwtUtil"
onBeforeMount(() => {
    setPageLayout('login')
})
const toast = useToast()
const router = useRouter()
const username = ref()
const password = ref()
const runtimeConfig = useRuntimeConfig()
const error = ref(false)

async function goLogin() {
    const result = await login(username.value, password.value)
    if (result) {
        localStorage.setItem("Token", result.token)
        let payload = getTokenPayload(result.token)
        localStorage.setItem("Fullname", payload.name)
        localStorage.setItem("UserID", payload.userId)
        localStorage.setItem("UserRole", payload.role)
        toast.add({ title: 'Login Successful' })
        // router.push('/movies')
    } else {
        error.value = true
    }
}

const microsoftRedirect =`${runtimeConfig.public.API_URL}/public/auth/microsoft`;


onBeforeMount(async () => {
    let token = localStorage.getItem("Token")
    if (token) {
        router.push('/movies')
    }
})
</script>

<template>
    <div class="min-h-screen  flex items-center justify-center bg-gradient-to-b from-[#E0F7FA] to-[#FFFFFF] font-noto h-screen">
        <div class="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg shadow-lg w-full  relative h-full ">

          

            <!-- Title -->
            <h2 class="text-2xl font-bold text-center text-[#0288D1] mb-6">Login</h2>

            <!-- Username Field -->
            <div class="mb-4">
                <label for="username" class="block text-gray-600 mb-1">Username </label>
                <input id="username" placeholder="Enter your username" v-model="username" @input="error = false"
                    class="w-full px-3 py-2 border bg-[#dfe5e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1] text-black"
                    required />
            </div>

            <!-- Password Field -->
            <div class="mb-4">
                <label for="password" class="block text-gray-600 mb-1">Password</label>
                <input type="password" id="password" placeholder="Enter your password" v-model="password"
                    @input="error = false"
                    class="w-full px-3 py-2 border bg-[#dfe5e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1] text-black"
                    required />
            </div>

            <!-- Error Message -->
            <p v-if="error" class="text-red-500 text-sm mb-4 font-semibold">Username or Password Is Wrong!</p>

            <!-- Submit Button -->
            <button type="submit"
                class="w-full bg-[#0288D1] text-white py-2 rounded-lg hover:bg-[#01579B] transition duration-75 mb-4"
                @click="goLogin">
                Login
            </button>

            <!-- Login with Microsoft -->
            <a :href="microsoftRedirect">
                <button type="button"
                    class="w-full bg-[#F3F4F6] text-[#0078D4] py-2 rounded-lg border border-[#0078D4] flex items-center justify-center hover:bg-[#E3E4E6] transition duration-75"
                    @click="loginWithMicrosoft">
                    <img src="/icons/microsoft.png" class="w-4 h-4 mr-3" />
                    Login with Microsoft
                </button>
            </a>

            <!-- Register Link -->
            <p class="text-gray-600 text-center text-sm mt-4 cursor-default">
                Don't have an account?
                <span class="text-[#0288D1] hover:underline cursor-pointer"
                    @click="router.push('/register')">Register</span>
            </p>
        </div>
    </div>
</template>

<style scoped>
/* Optional: Add more custom styles here if needed */

/* Responsive styling */
@media (max-width: 640px) {
    .max-w-md {
        max-width: 90%;
    }

    .p-6 {
        padding: 1.5rem;
    }
}
</style>
