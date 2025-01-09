<script setup>
import { getCoupons } from '~/composables/GET/coupon'
import { formatDate, isFutureTimestamp } from '~/composables/utils/formatDate'
import { activateCoupon } from '~/composables/PUT/activateCoupon'
const swal = useNuxtApp().$swal
const coupons = ref([])
onBeforeMount(async () => {
  setPageLayout('main')
  coupons.value = await getCoupons('active')
  if (coupons.value == null) {
    coupons.value = []
    toast.add({
      icon: "ic:round-error",
      title: 'Opp!',
      color: "red",
      description: 'Unable to fetch coupons. Please try again.',
      id: 'getEmp-error',
      type: 'error'
    })
  }
})

definePageMeta({
  middleware: "auth", // Use the 'auth' middleware
})

const couponType = [{
  id: 1,
  name: 'Active'
}, {
  id: 2,
  name: 'Used'
}, {
  id: 3,
  name: 'Expired'
}]

const selected = ref(couponType[0].id)

function onSelectionChange(newValue) {
  fetchCoupon(newValue)
}


async function activate(id,name, activate, expire) {
  if (!activate && !expire) {
    swal.fire({
      title: "Comfirmation",
      text: "Are you sure to use " + name +" coupon",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then(async (result) => {
      
      if (result.isConfirmed) {
        let result = await activateCoupon(id)
        console.log(result);
        
        if (result.status == 200) {
          swal.fire({
            title: 'use coupon successfuly!',
            // text: `you got ${redeem.data.token} token `,
            icon: 'success',
            confirmButtonText: 'ok'
          })
          fetchCoupon('active')
        } else {
          swal.fire({
            icon: "error",
            title: "Oops! Something went wrong",
            text: "Can not activate coupon",
          });
        }
      }
    });
  }

}

// ใช้ watch เพื่อเรียกฟังก์ชันเมื่อ selected เปลี่ยนค่า
watch(selected, (newValue) => {
  onSelectionChange(newValue);
});
const toast = useToast()
async function fetchCoupon(type) {

  let nameType = type === 1 ? "active" :
    type === 2 ? "used" :
      type === 3 ? "expired" :
        "active";

  coupons.value = await getCoupons(nameType)
  if (coupons.value == null) {
    coupons.value = []
    toast.add({
      icon: "ic:round-error",
      title: 'Opp!',
      color: "red",
      description: 'Unable to fetch coupons. Please try again.',
      id: 'getEmp-error',
      type: 'error'
    })
  }
}

</script>

<template>
  <div class="w-full h-full bg-blue-400 p-6">
    <div class="flex flex-row">
      <h1 class="text-2xl font-bold mb-4 text-white">My coupons</h1>
      <div class="absolute right-10  ">
        <USelectMenu v-model="selected" :options="couponType" placeholder="Select coupon type" value-attribute="id"
          option-attribute="name" class="w-full" />
      </div>
    </div>

    <div class="w-full h-[90%] bg-white shadow rounded-lg p-6 overflow-y-auto ">
      <div v-for="coupon in coupons" :key="coupon.id" v-if="coupons.length != 0"
        class="flex items-center gap-4 p-4 mb-4  rounded-lg shadow active:bg-gray-200 w-full"
        :class="!coupon.isActivated && isFutureTimestamp(coupon.expiredDate) ? 'bg-gray-50 active:bg-gray-200' : 'bg-gray-200'"
        @click="activate(coupon.id,coupon.event.title, coupon.isActivated, !isFutureTimestamp(coupon.expiredDate))">
        <img src="/icons/ticket.png" alt="Logo" class="w-12 h-12  object-cover" />
        <div class="w-full">
          <h2 class="text-lg font-semibold text-blue-400   w-[90%] break-words">{{ coupon.event.title }} Coupon</h2>
          <p class="text-sm text-gray-500" v-if="!coupon.isActivated && isFutureTimestamp(coupon.expiredDate)">Valid
            until {{ formatDate(coupon.expiredDate) }}</p>
          <p class="text-sm text-red-500 font-bold"
            v-else-if="!isFutureTimestamp(coupon.expiredDate) && !coupon.isActivated">Expired</p>
          <p class="text-sm text-emerald-500" v-else=>Used</p>
        </div>
      </div>
      <div v-else class="w-full h-full flex justify-center items-center flex-col">
        <img src="/icons/cart.png" class="w-[30%]" />
        <h1 class="text-blue-400 text-lg font-bold">No have any coupon</h1>

      </div>
    </div>
  </div>
</template>



<style scoped></style>