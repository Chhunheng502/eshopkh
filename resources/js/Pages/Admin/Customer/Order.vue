<template>
    <DashboardLayout>
        <h2 class="dashboard-header">Customer Orders</h2>
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Total Cost</th>
                        <th>Date</th>
                        <th>Address</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders.data" :key="order.id">
                        <td>{{ order.user.first_name + ' ' + order.user.last_name }}</td>
                        <td>{{ order.user.email }}</td>
                        <td>0{{ order.user.phone }}</td>
                        <td>{{ order.total_cost }}$</td>
                        <td>{{ order.created_at }}</td>
                        <td>{{ order.user.address }}</td>
                        <td class="d-flex align-items-center justify-content-around">
                            <Modal>
                                <template v-slot:wrapper>
                                    <i class="fa fa-info-circle fa-lg text-primary" style="cursor:pointer"></i>
                                </template>

                                <template v-slot:header>
                                    <h5>Order Detail</h5>
                                </template>

                                <template v-slot:content>
                                    <table class="fl-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Unit Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="detail in order.detail">
                                                <td>{{ detail.product_id }}</td>
                                                <td>{{ detail.product_name }}</td>
                                                <td>{{ detail.product_price }}$</td>
                                                <td>{{ detail.quantity }}</td>
                                                <td>{{ detail.product_price * detail.quantity }}$</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </template>
                            </Modal>
                            <i class="fa fa-check-circle fa-lg text-success" style="cursor:pointer" @click="acceptOrder(order.id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination :links="orders.links" />
    </DashboardLayout>
</template>

<script>
import { defineComponent } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import Modal from '@/Components/Modal.vue'
import Pagination from '@/Components/Pagination.vue'

export default defineComponent({
    components: {
        DashboardLayout,
        Modal,
        Pagination
    },

    props: {
        orders: Object
    },

    methods: {
        acceptOrder(id) {
            useForm({_method: 'put'}).post(`http://127.0.0.1:8000/orders/${id}`, {
                preserveScroll: true,
                onSuccess: () => console.log('success')
            });
        },
    }
})
</script>
