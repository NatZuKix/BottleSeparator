<script setup>

import { getUser } from '~/composables/GET/user';
import { getWithExpiry } from "~/composables/utils/localStorageUtil"
import { getEvents } from '~/composables/GET/event';
import { formatDate, isFutureTimestamp } from '~/composables/utils/formatDate'
import { generateCoupon } from '~/composables/POST/generateCoupon';

definePageMeta({
    middleware: "auth", // Use the 'auth' middleware
})
const swal = useNuxtApp().$swal
const user = ref({})
const toast = useToast()
const events = ref([])
const router = useRouter()
const redeemMode = ref(false)
onBeforeMount(async () => {
    setPageLayout('main')
    const id = getWithExpiry('UserID')
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

    await fetchEvents(1)
})

async function fetchEvents(value) {
    let nameType = value == 1 ? "false" : 'true'
    if (value == 2) {
        redeemMode.value = true
    } else {
        redeemMode.value = false
    }
    events.value = await getEvents(nameType)
    if (events.value == null) {
        events.value = []
        toast.add({
            icon: "ic:round-error",
            title: 'Opp!',
            color: "red",
            description: 'Unable to fetch events. Please try again.',
            id: 'getEvent-error',
            type: 'error'
        })
    }
}

const type = [{
    id: 1,
    name: 'All'
}, {
    id: 2,
    name: 'Redeemed'
}]
const selected = ref(type[0].id)

watch(selected, (newValue) => {
    onSelectionChange(newValue);
});

function onSelectionChange(newValue) {
    fetchEvents(newValue)
}


async function generate(id, title, expire) {
    if(redeemMode.value){
        return
    }

    if (!expire) {
        swal.fire({
            title: "Comfirmation",
            text: "Are you sure to redeem "+title+" coupon",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let result = await generateCoupon(id)
                if(!result){
                    swal.fire({
                        icon: "error",
                        title: "Oops! Something went wrong",
                        text: "Can not activate coupon",
                    });
                }
                if (result.status == 200) {
                    swal.fire({
                        title: 'use coupon successfuly!',
                        // text: `you got ${redeem.data.token} token `,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                    router.push('/coupon')
                } else {
                    swal.fire({
                        icon: "error",
                        title: "Oops! Something went wrong",
                        text: "Can not activate coupon",
                    });
                }
            }
        });
    } else {
        swal.fire({
            icon: "error",
            title: "Oops! Can not create coupong",
            text: "This event is expired.",
        });
    }

}

</script>

<template>
    <div class="w-full h-full">
        <div class="w-full  bg-blue-400 rounded-b-lg shadow-md h-[9%]">

            <div class="flex w-full h-full  items-center justify-start gap-3 relative">
                <div class="absolute right-5 flex items-center justify-start gap-2 ">
                    <img class="w-12 " src="/icons/token.png" alt="User tokenn" />
                    <p class="text-white text-center bg-slate-400 rounded-lg px-3">{{ user.credit }} Tokens</p>
                </div>
                <h1 class="absolute left-8 text-3xl font-bold text-white">Events</h1>

            </div>

        </div>
        <div class="w-full flex justify-end pt-2 bg-gray-100 gap-2 items-center">
            <h1>Categories : </h1>
            <USelectMenu v-model="selected" :options="type" placeholder="Select people" value-attribute="id"
                option-attribute="name" class="w-[30%]" />

        </div>

        <div class="w-full  bg-white  h-[83%] ">
            <div class="bg-gray-100 p-6 space-y-4 h-full w-full">
                <!-- Transaction Item -->
                <div v-for="event in events" :key="event.id"
                    class="flex justify-between items-center bg-white p-4 rounded-lg shadow " :class="redeemMode?'':'active:bg-slate-300'" @click="generate(event.id, event.title, isFutureTimestamp(event.expiredAt))">
                    <div class="flex items-center space-x-4  w-full">
                        <!-- Icon -->
                        <div
                            class="w-12 h-12 bg-gray-200 flex justify-center items-center rounded-full overflow-hidden">
                            <img src="/icons/gift.png" alt="Icon" class="object-cover w-full h-full" />
                        </div>
                        <!-- Name & Description -->
                        <div v-if="!redeemMode" class="w-full">
                            <p class="text-lg font-medium break-words  w-44 ">{{ event.title }}</p>
                            <p class="text-sm text-gray-500">coupon quantity : {{ event.quantity }}</p>
                            <p class="text-sm text-gray-500" v-if="event.expiredAt">Valid until {{
                                formatDate(event.expiredAt) }}</p>
                        </div>
                        <div v-else>
                            <p class="text-lg font-medium break-words  w-44">{{ event.title }}</p>
                            <p class="text-sm text-emerald-500 font-semibold">redeemed</p>

                        </div>
                    </div>
                    <!-- Points -->
                    <div class="flex justify-center items-center gap-2">
                        <h1>{{ event.pointUsed }}</h1>
                        <img class="w-8  " src="/icons/token.png" alt="User Avatar" />
                    </div>

                </div>
            </div>

        </div>



    </div>

</template>
<style scoped></style>