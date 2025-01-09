import {getWithExpiry} from "~/composables/utils/localStorageUtil"

export default defineNuxtRouteMiddleware((to, from) => {

  // Ensure the code runs only on the client side
  if (process.client) {
    const token = getWithExpiry('Token')


    if (!token) {
      localStorage.removeItem("FullName");
      localStorage.removeItem("UserID");
      localStorage.removeItem("UserRole");
      localStorage.removeItem("Token");
      return navigateTo("/login")
    }


    try {
      // Decode token and check expiration
      const payloadBase64 = token.split(".")[1]
      const decodedPayload = JSON.parse(atob(payloadBase64))
      const currentTime = Math.floor(Date.now() / 1000)

      if (decodedPayload.exp < currentTime) {
        // Remove expired token and redirect
        localStorage.removeItem("FullName");
        localStorage.removeItem("UserID");
        localStorage.removeItem("UserRole");
        localStorage.removeItem("Token");
        return navigateTo("/login")
      }
    } catch (error) {
      console.error("Invalid token")
      localStorage.removeItem("FullName");
      localStorage.removeItem("UserID");
      localStorage.removeItem("UserRole");
      localStorage.removeItem("Token");
      return navigateTo("/login")
    }
  }
})
