<template>
    <AppLayout>
        <div class="container p-5">
            <main>
                <div class="text-center">
                    <h2>Checkout Form</h2>
                </div>

                <div class="row p-5">
                    <div class="col-md m-3">
                        <Payment />
                    </div>
                    <div class="col-md m-3">
                        <Cart />
                    </div>
                </div>
            </main>
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'

import AppLayout from '@/Layouts/AppLayout.vue'
import Cart from './Cart.vue'
import Payment from './Payment.vue'

export default defineComponent({
    components: {
        AppLayout,
        Cart,
        Payment
    }
})
</script>
