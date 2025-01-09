<script setup>
import { callback } from "~/composables/POST/callback"
import { getTokenPayload } from "~/composables/utils/jwtUtil"
import {setWithExpiry} from "~/composables/utils/localStorageUtil"
const route = useRoute()
const router = useRouter()
const code = ref(route.query.code)
const handleCallback = async () => {
    const result = await callback(code.value)
    // console.log(result)
    if (result) {
        setWithExpiry("Token", result.token,180)
        let payload = getTokenPayload(result.token)
        setWithExpiry("FullName", payload.name,180)
        setWithExpiry("UserID", payload.userId,180)
        setWithExpiry("UserRole", payload.role,180)
        router.push('/info')
    } else {
        

    }
}
onMounted(() => {
  handleCallback()
})
</script>

<template>
  <div class="w-full h-full bg-blue-400 flex justify-center items-center">
    <div class="flex flex-col items-center ">
      <span class="loader mb-4"></span>
      <p class="text-white text-xl">logging in...</p>
    </div>


  </div>
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #FFF;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 0s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
    
</style>
