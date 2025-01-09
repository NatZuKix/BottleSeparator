export default defineNuxtRouteMiddleware((to, from) => {
  
    // Ensure the code runs only on the client side
    if (process.client) {
      const token = localStorage.getItem("Token")

      const role = localStorage.getItem("UserRole")
  
      if (!token) {
        localStorage.clear()
        return navigateTo("/login")
      }

  
      try {
        // Decode token and check expiration
        const payloadBase64 = token.split(".")[1]
        const decodedPayload = JSON.parse(atob(payloadBase64))
        const currentTime = Math.floor(Date.now() / 1000)
  
        if (decodedPayload.exp < currentTime) {
          // Remove expired token and redirect
          localStorage.clear()
          return navigateTo("/login")
        }
      } catch (error) {
        console.error("Invalid token")
        localStorage.clear()
        return navigateTo("/login")
      }
    }
  })
  