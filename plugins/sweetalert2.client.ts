// plugins/sweetalert2.client.ts
import Swal from 'sweetalert2'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      swal: Swal
    }
  }
})
