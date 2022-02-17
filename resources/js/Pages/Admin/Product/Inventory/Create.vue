<template>
    <DashboardLayout>
        <progress v-if="form.progress" :value="form.progress.percentage" max="100">
            {{ form.progress.percentage }}%
        </progress>
        <h2 class="dashboard-header">Add New Product</h2>
        <!-- need improvement on responsiveness -->
        <div class="w-50 p-5 mx-auto bg-success rounded-lg shadow">
            <form>
                <div class="row">
                    <div class="form-group col-lg">
                        <label for="product-name">Name</label>
                        <input type="text" class="form-control" id="product-name" placeholder="Enter name" v-model="form.name">
                    </div>
                    <div class="form-group col-lg-4">
                        <label for="product-price">Price</label>
                        <input type="number" class="form-control" id="product-price" placeholder="Enter price" v-model="form.price">
                    </div>
                </div>
                <div class="form-group my-2">
                    <label for="product-feature">Feature</label>
                    <textarea type="text" class="form-control" id="product-feature" placeholder="Enter feature..." v-model="form.feature"></textarea>
                </div>
                <div class="row">
                    <div class="form-group col-lg">
                        <label for="product-quantity">Quantity</label>
                        <input type="number" class="form-control" id="product-quantity" placeholder="Enter quantity" v-model="form.quantity">
                    </div>
                    <div class="form-group col-lg">
                        <label for="product-type">Type</label>
                        <select class="form-select" id="product-type" v-model="form.type">
                            <option value="" selected disabled>Select type</option>
                            <option value="cm">Clothing for Men</option>
                            <option value="cw">Clothing for Women</option>
                            <option value="sm">Shoes for Men</option>
                            <option value="sw">Shoes for Women</option>
                            <option value="bm">Bag for Men</option>
                            <option value="bw">Bag for Women</option>
                            <option value="am">Accessory for Men</option>
                            <option value="aw">Accessory for Women</option>
                        </select>
                    </div>
                </div>
                <div class="form-group my-2">
                    <label for="product-info">Info</label>
                    <textarea type="text" class="form-control" id="product-info" placeholder="Enter info..." v-model="form.info"></textarea>
                </div>
                <div class="form-group">
                    <label for="product-highlight">Highlight</label>
                    <textarea type="text" class="form-control" id="product-highlight" placeholder="Enter highlight..." v-model="form.highlight"></textarea>
                </div>
                <div class="form-group my-2">
                    <label for="product-primary-image">Upload Primary Image</label>
                    <input type="file" class="form-control" id="product-primary-image" @change="getFileUpload($event, 0)">
                </div>
                <div class="form-group">
                    <label for="product-secondary-image-1">Upload Secondary Image 1</label>
                    <input type="file" class="form-control" id="product-secondary-image-1" @change="getFileUpload($event, 1)">
                </div>
                <div class="form-group my-2">
                    <label for="product-secondary-image-2">Upload Secondary Image 2</label>
                    <input type="file" class="form-control" id="product-secondary-image-2" @change="getFileUpload($event, 2)">
                </div>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary" :disabled="form.processing" @click="create">Submit</button>
                </div>
            </form>
        </div>
    </DashboardLayout>
</template>

<script>
import { defineComponent } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'

export default defineComponent({
    components: {
        DashboardLayout
    },

    data() {
        return {
            form: useForm({
                name: "",
                price: 0,
                feature: "",
                quantity: 0,
                type: "",
                info: "",
                highlight: "",
                primary_image: "",
                secondary_image1: "",
                secondary_image2: ""
            })
        }
    },

    methods: {
        getFileUpload(event, id) {
            if(id == 0) {
                this.form.primary_image = event.target.files[0];
            } else if(id == 1) {
                this.form.secondary_image1 = event.target.files[0];
            } else {
                this.form.secondary_image2 = event.target.files[0];
            }
        },

        create() {
            this.form.post('http://127.0.0.1:8000/products', {
                onSuccess: () => console.log('success'),
                onError: (e) => console.log(e)
            });
        }
    }
})
</script>
