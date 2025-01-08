import {jwtDecode} from "jwt-decode"

// Function to get payload from token
function getTokenPayload(token) {
  try {
    const decoded = jwtDecode(token)
    return decoded // Returns the payload
  } catch (error) {
    console.error("Invalid token:", error.message)
    return null
  }
}

export {getTokenPayload}
