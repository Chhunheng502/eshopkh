<template>
    <DashboardLayout>
        <h2 class="dashboard-header">Collection Detail</h2>
        <div class="album py-3">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div v-for="collection in collection.data" class="col mb-3">
                        <div class="card shadow-sm w-50">
                            <i class="fa fa-minus-circle p-1" @click="deleteProduct(collection.product.id)" style="cursor:pointer;color:red" aria-hidden="true"></i>
                            <img :src="collection.product.detail.primary_image" class="card-img-top" width="100" height="100" style="object-fit:contain" alt="" />
                            <div class="card-body">
                                <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                                    <p3 class="text-muted">{{ collection.product.name }}</p3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Pagination :links="collection.links" />
        </div>
    </DashboardLayout>
</template>

<script>
import { defineComponent } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import Pagination from '@/Components/Pagination.vue'

export default defineComponent({
    components: {
        DashboardLayout,
        Pagination
    },

    props: {
        collection: Object
    },

    methods: {
        deleteProduct(id) {
            useForm({_method: 'delete'}).post(`http://127.0.0.1:8000/collections/detail/${id}`, {
                preserveScroll: true,
                onBefore: () => confirm('Are you sure you want to delete this product?'), // improve style on alert
                onSuccess: () => console.log('success')
            });
        }
    }
})
</script>
