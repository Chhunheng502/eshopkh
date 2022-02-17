<template>
    <AppLayout>
        <div class="container my-5" style="min-height:100vh">
            <h4 class="mb-2"> Your Coupon: </h4>
            <div class="row">
                <div v-for="coupon in coupons" class="col-md-6">
                    <div class="coupon bg-white rounded mb-3 d-flex justify-content-between">
                        <div class="kiri p-3">
                            <div class="icon-container ">
                                <div class="icon-container_box">
                                    <img src="http://127.0.0.1:8000/images/coupon.png" width="85" alt="coupon" class="" />
                                </div>
                            </div>
                        </div>
                        <div class="tengah py-3 d-flex w-100 justify-content-start">
                            <div>
                                <h5 class="text-success">Valid</h5>
                                <h3 class="lead">{{ coupon.type }}</h3>
                                <p class="text-muted mb-0"><span class="text-primary">{{ coupon.product.name }}</span> - {{ coupon.product.feature }}</p>
                            </div>
                        </div>
                        <div class="kanan">
                            <div class="info m-3 d-flex align-items-center text-center">
                                <div class="w-100">
                                    <div class="block">
                                        <span class="time font-weight-light">
                                            <span>{{ coupon.expired_date }} {{ pluralize('day', coupon.expired_date) }} left</span>
                                        </span>
                                    </div>
                                    <Modal>
                                        <template v-slot:wrapper>
                                            <button class="btn btn-sm btn-outline-danger btn-block"> Show </button>
                                        </template>

                                        <template v-slot:header>
                                            <h5>Available Code</h5>
                                        </template>

                                        <template v-slot:content>
                                            <hr>
                                            <p>{{ coupon.code }}</p>
                                            <hr>
                                        </template>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'

import AppLayout from '@/Layouts/AppLayout.vue'
import Modal from '@/Components/Modal'

export default defineComponent({
    components: {
        AppLayout,
        Modal
    },

    props: {
        coupons: Array
    },

    methods: {
        isValid(created_time, expired_time) {
            return created_time > expired_time;
        },

        pluralize(word, amount) {
            return (amount > 1 || amount === 0) ? `${word}s` : word;
        }
    }
})
</script>
