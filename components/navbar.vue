<template>
  <div class="flex justify-around items-center bg-blue-400 p-3 rounded-t-lg">
    <div class="text-white text-center flex flex-col cursor-pointer" @click="showAlert">
      <i class="fa-solid fa-gift text-xl mb-1"></i>
      <span>event</span>
    </div>
    <div class="text-white text-center flex flex-col cursor-pointer" @click="showAlert">
      <i class="fa-solid fa-ticket text-xl mb-1"></i>
      <span>coupon</span>
    </div>
    <div class="text-white text-center flex flex-col cursor-pointer" @click="router.push('/redeem')">
      <i class="fas fa-plus-circle text-xl mb-1"></i>
      <span>redeem</span>
    </div>
    <div class="text-white text-center flex flex-col cursor-pointer" @click="router.push('/info')" >
      <i class="fa-solid fa-user text-xl mb-1"></i>
      <span>info</span>
    </div>
    <div class="text-white text-center flex flex-col cursor-pointer" @click="showAlert">
      <i class="fa-solid fa-right-from-bracket text-xl mb-1"></i>
      <span>logout</span>
    </div>
  </div>
</template>

<script setup>
const swal = useNuxtApp().$swal
const router = useRouter()

function showAlert() {
  swal.fire({
  title: "Logout Comfirmation",
  text: "Are you sure want to logout?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Confirm"
}).then((result) => {
  if (result.isConfirmed) {
    localStorage.clear()
    router.push('/login')
  }
});
}


</script>

<style scoped></style>
