<script setup>
import Chart from '~/components/chart.vue';
import { getUser } from '~/composables/GET/user';
import {getWithExpiry} from "~/composables/utils/localStorageUtil"

definePageMeta({
  middleware: "auth", // Use the 'auth' middleware
})

const user = ref({})
const toast = useToast()
const total = ref(0)
const bottle = ref(0)
const can = ref(0)
onBeforeMount(async () => {
  setPageLayout('main')
  const id =getWithExpiry('UserID')
  user.value = await getUser(id)
  if (user.value == null) {
    toast.add({
      icon: "ic:round-error",
      title: 'Error!',
      color: "red",
      description: 'Unable to fetch user data. Please try again.',
      id: 'getEmp-error',
      type: 'error'
    })
  }
  total.value = user.value.trashs.length
  bottle.value = await user.value.trashs.filter((trash) => trash.trashType == "BOTTLE").length
  can.value = await user.value.trashs.filter((trash) => trash.trashType == "CAN").length

})


// const user = {
//   name: 'John Doe',
//   credit: 3,
//   bio: 'Software Developer who loves building web applications and exploring new technologies.',
//   profilePicture: 'https://via.placeholder.com/150',
// };
</script>

<template>
  <div class="w-full h-full bg-white flex flex-col items-center">

    <div class="w-full  bg-blue-400 rounded-lg shadow-md ">
      <div class="flex flex-col items-center p-6 w-full ">

        <img class="w-24 h-24 rounded-full  border-primary" src="/icons/profile.png" alt="User Avatar" />
        <h1 class="mt-4 text-xl font-semibold text-white  break-words text-center">{{ user.name }}</h1>
        <div class="flex flex-row text-center items-center justify-center gap-3">
          <img class="w-8 h-8   " src="/icons/token.png" alt="User Avatar" />
          <p class="text-white">{{ user.credit }} Tokens</p>
        </div>

      </div>

    </div>
    <!-- <h1 class="mt-4 text-2xl font-semibold text-blue-400" v-if="total>0">Summary</h1> -->
    <Chart :bottle="bottle" :can="can"  v-if="total>0" class="mt-2"/>
    <h1 class="mt-4 text-2xl font-semibold text-blue-400"  v-if="total>0">Total : {{ total }} </h1>

    <div class="flex justify-center  items-center h-fullw-full flex-col mt-10"  v-if="total<=0">

      <img class="w-20 h-20   " src="/icons/no-data.png" alt="No-data" />
      <h1 class="mt-4 text-2xl font-semibold text-blue-400">No data for summary</h1>
    </div>

  </div>
</template>



<style scoped>
/* สำหรับปรับแต่งเพิ่มเติม */
</style>
