<script setup>
import { callback } from "~/composables/POST/callback"
import { getTokenPayload } from "~/composables/utils/jwtUtil"
const route = useRoute()
const router = useRouter()
const code = ref(route.query.code)
const handleCallback = async () => {
    const result = await callback(code.value)
    // console.log(result)
    if (result) {
        localStorage.setItem("Token", result.token)
        let payload = getTokenPayload(result.token)
        localStorage.setItem("FullName", payload.name)
        localStorage.setItem("UserID", payload.userId)
        localStorage.setItem("UserRole", payload.role)

    } else {
        

    }
}

onMounted(() => {
  handleCallback()
})
</script>

<template>
</template>

<style scoped>
/* Add any custom styling if needed */
</style>
