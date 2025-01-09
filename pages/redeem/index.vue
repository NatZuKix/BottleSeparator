<script setup>
import { redeemToken } from '~/composables/POST/redeem';
const code = ref('')
onBeforeMount(() => {
  setPageLayout('main')
})
definePageMeta({
    middleware: "auth", // Use the 'auth' middleware
})


const showAlert = async () => {
  const swal = useNuxtApp().$swal
  if (code.value.trim().length != 5) {
    swal.fire({
      icon: "error",
      title: "Cannot activate token",
      text: "This code is not correct.",
    });
    code.value=''
    return
  }
  let redeem = await redeemToken(code.value.trim())
  // console.log(redeem);

  if (redeem.status == 200) {
    swal.fire({
      title: 'Redeem token successfuly!',
      text: `you got ${redeem.data.token} token `,
      icon: 'success',
      confirmButtonText: 'Cool'
    })
  }
  else if (redeem.status == 409) {
    swal.fire({
      icon: "error",
      title: "Cannot activate token",
      text: "This code has already been used.",
    });
  } else if (redeem.status == 404) {
    swal.fire({
      icon: "error",
      title: "Cannot activate token",
      text: "This code is not correct.",
    });
  } else {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    code.value=''

  }


}


</script>

<template>

  <div class="w-full h-full">
    <div class="w-full h-full flex">
      <div class="flex flex-col w-full items-center justify-center">
        <h1 class="font-extrabold text-4xl text-blue-400 mb-3 xl:text-9xl md:text-7xl">Redeem Token</h1>
        <img src="/icons/token.png" class="w-[30%]" />
        <div class="mb-4 mt-5 w-full justify-center flex">
          <input id="code" placeholder="Enter your code" v-model="code"
            class="w-[45%] px-3 py-2 border bg-[#dfe5e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0288D1] text-black"
            required />
        </div>
        <button type="submit"
          class="w-[45%]  bg-[#0288D1] text-white py-2 rounded-lg hover:bg-[#01579B] transition duration-75 mb-4"
          @click="showAlert">
          Redeem
        </button>
      </div>
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
