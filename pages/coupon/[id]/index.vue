<template>
    <div class="w-full h-full bg-gray-100 p-6">
        <div class="flex flex-row">
            <h1 class="text-2xl font-bold mb-4">My coupons</h1>
            <h1 class="text-2xl font-bold mb-4">My coupons</h1>
        </div>

      <div class="w-full h-[90%] bg-white shadow rounded-lg p-6 overflow-y-auto">
        <div v-for="coupon in coupons" :key="coupon.id" class="flex items-center gap-4 p-4 mb-4 bg-gray-50 rounded-lg shadow active:bg-gray-200">
          <img src="/icons/ticket.png" alt="Logo" class="w-12 h-12  object-cover" />
          <div>
            <h2 class="text-lg font-semibold">{{ coupon.title }}</h2>
            <p class="text-green-600 font-bold">{{ coupon.discount }}</p>
            <p class="text-sm text-gray-500">Valid until {{ coupon.validity }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

onBeforeMount(async () => {
  setPageLayout('main')


})

definePageMeta({
  middleware: "auth", // Use the 'auth' middleware
})

  const coupons = [
    {
      id: 1,
      title: "Domino's Pizza",
      discount: "50% off",
      validity: "January 25th",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Dominos_pizza_logo.svg/1200px-Dominos_pizza_logo.svg.png",
    },
    {
      id: 2,
      title: "Adidas",
      discount: "25% off",
      validity: "February 1st",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      id: 3,
      title: "Starbucks",
      discount: "50% off",
      validity: "March 1st",
      logo: "https://upload.wikimedia.org/wikipedia/sr/thumb/4/45/Starbucks_Coffee_Logo.svg/1200px-Starbucks_Coffee_Logo.svg.png",
    },
    {
      id: 4,
      title: "Target",
      discount: "25% off",
      validity: "January 29th",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Target_logo.svg/1200px-Target_logo.svg.png",
    },
    {
      id: 4,
      title: "Target",
      discount: "25% off",
      validity: "January 29th",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Target_logo.svg/1200px-Target_logo.svg.png",
    },
    {
      id: 4,
      title: "Target",
      discount: "25% off",
      validity: "January 29th",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Target_logo.svg/1200px-Target_logo.svg.png",
    },
    {
      id: 4,
      title: "Target",
      discount: "25% off",
      validity: "January 29th",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Target_logo.svg/1200px-Target_logo.svg.png",
    },
    {
      id: 4,
      title: "Target",
      discount: "25% off",
      validity: "January 29th",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Target_logo.svg/1200px-Target_logo.svg.png",
    },
    {
      id: 4,
      title: "Target",
      discount: "25% off",
      validity: "January 29th",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Target_logo.svg/1200px-Target_logo.svg.png",
    },
    {
      id: 4,
      title: "Target",
      discount: "25% off",
      validity: "January 29th",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Target_logo.svg/1200px-Target_logo.svg.png",
    },
  ];
  </script>
  
  <style scoped>
  /* เพิ่ม CSS เฉพาะได้หากต้องการ */
  </style>