<template>
    <DashboardLayout>
        <h2 class="dashboard-header">Product Inventory</h2>
        <FlashMessage />
        <div class="dashboard-event">
            <div class="d-flex">
                <div class="form-group">
                    <label for="sort-by-gender">Sort by gender:</label>
                    <select class="form-select" v-model="gender" id="sort-by-gender">
                        <option value="all">All</option>
                        <option value="m">Men</option>
                        <option value="w">Women</option>
                    </select>
                </div>
                <div class="form-group" style="margin-left:10px">
                    <label for="sort-by-type">Sort by type:</label>
                    <select class="form-select" v-model="type" id="sort-by-type">
                        <option value="all">All</option>
                        <option value="c">Clothing</option>
                        <option value="s">Shoe</option>
                        <option value="b">Bag</option>
                        <option value="a">Accessory</option>
                    </select>
                </div>
            </div>
            <div class="d-flex">
                <Link href="/admin/inventory/create">
                    <button type="button" class="btn btn-success"><i class="fa fa-plus-circle"></i> Product</button>
                </Link>
                <SearchInput v-model="search" />
            </div>
        </div>
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                    <tr v-if="!selectedItems.length">
                        <th></th>
                        <th v-for="thName in ['name', 'price', 'quantity']"
                            @click="handleSort(thName)">
                            {{ thName }}
                            <i
                                class="fa fa-lg"
                                :class="getSortingIcon(thName)"
                            >
                            </i>
                        </th>
                        <th></th>
                    </tr>
                    <tr v-else>
                        <th colspan="5">
                            <form class="d-flex justify-content-center">
                                <Modal ref="addToCollectionModal">
                                    <template v-slot:wrapper>
                                        <button type="button" class="btn btn-primary"><i class="fa fa-arrow-circle-right"></i> Collection</button>
                                    </template>

                                    <template v-slot:header>
                                        <h5>Add to Collection</h5>
                                    </template>

                                    <template v-slot:content>
                                        <select class="form-select" v-model="selectedCollection">
                                            <option value="default" disabled selected>Select Collection</option>
                                            <option v-for="collection in collections" :value="collection.id">{{ collection.name }}</option>
                                        </select>
                                    </template>

                                    <template v-slot:footer>
                                        <button type="button" class="btn btn-secondary" @click="$refs.addToCollectionModal.close()">Close</button>
                                        <button type="button" class="btn btn-primary" style="margin-left:5px" @click="addToCollection">Done</button>
                                    </template>
                                </Modal>
                                <button type="button" class="btn btn-danger mx-2" @click="deleteSelectedProducts">Delete</button>
                            </form>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="product in products.data"
                        :id="'table-inventory-' + product.id"
                        @click.ctrl="selectItem(product.id)"
                    >
                        <td><img :src="product.detail.primary_image" width="50" height="50" style="object-fit:cover" alt=""></td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>
                            <Link :href="'/admin/inventory/edit/' + product.id">
                                <button type="button" class="btn-sm btn-primary"><i class="fa fa-edit"></i></button>
                            </Link>
                            <button type="button" class="btn-sm btn-danger mx-1" @click="deleteProduct(product.id)"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination :links="products.links" />
    </DashboardLayout>
</template>

<style>
.selected-item {
    background-color: #4FC3A1;
}
</style>

<script>
import { defineComponent } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import throttle from 'lodash/throttle'
import $ from 'jquery'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import FlashMessage from '@/Components/FlashMessage.vue'
import { Link, useForm } from '@inertiajs/inertia-vue3'
import SearchInput from '@/Components/SearchInput.vue'
import Modal from '@/Components/Modal.vue'
import Pagination from '@/Components/Pagination.vue'

export default defineComponent({
    components: {
        DashboardLayout,
        FlashMessage,
        Link,
        SearchInput,
        Modal,
        Pagination
    },

    props: {
        products: Object,
        collections: Array,
        filters: Object
    },

    data() {
        return {
            gender: this.filters.gender ?? 'all',
            type: this.filters.type ?? 'all',
            search: this.filters.search ?? '',
            sort: this.filters.sort ?? '',
            selectedItems: [],
            selectedCollection: 'default',
        }
    },

    watch: {
        gender: function(value) {
            Inertia.get(this.$page.url, {gender: value}, {
                preserveState: true,
                replace: true
            })
        },

        type: function(value) {
            Inertia.get(this.$page.url, {type: value}, {
                preserveState: true,
                replace: true
            })
        },

        search: throttle(function(value) {
            Inertia.get(this.$page.url, {search: value}, {
                preserveState: true,
                replace: true
            })
        }, 500),

        sort: function(value) {
            Inertia.get(this.$page.url, {sort: value}, {
                preserveState: true,
                replace: true
            })
        },
    },

    methods: {
        handleSort(thName) {
            if(this.sort == '' || !this.sort.includes(thName)) {
                this.sort = thName + '_desc';
            } else if(this.sort.includes('desc')) {
                this.sort = thName + '_asc';
            } else {
                this.sort = '';
            }
        },

        getSortingIcon(thName) {
            if(this.sort.includes(thName)) {
                return this.sort.includes('desc') ? 'fa-angle-down' : 'fa-angle-up';
            }
        },

        addToCollection() {
            Inertia.post(`http://127.0.0.1:8000/collections/detail/${this.selectedCollection}`, {data: this.selectedItems}, {
                preserveState: true,
                onSuccess: () => this.resetSelect(),
                onError: (e) => console.log(e)
            });

            this.$refs.addToCollectionModal.close();
        },

        deleteSelectedProducts() {
            Inertia.post('http://127.0.0.1:8000/products/many', {data: this.selectedItems}, {
                preserveScroll: true,
                onBefore: () => confirm('Are you sure you want to delete this product?'), // improve style on alert
                onSuccess: () => this.resetSelect()
            });
        },

        selectItem(id) {
            if($('#table-inventory-' + id).hasClass("selected-item")) {
                $('#table-inventory-' + id).removeClass("selected-item");
                this.selectedItems = this.selectedItems.filter(itemId => itemId != id);
            } else {
                $('#table-inventory-' + id).addClass("selected-item");
                this.selectedItems.push(id);
            }
        },

        deleteProduct(id) {
            useForm({_method: 'delete'}).post(`http://127.0.0.1:8000/products/${id}`, {
                preserveScroll: true,
                onBefore: () => confirm('Are you sure you want to delete this product?'), // improve style on alert
                onSuccess: () => console.log('success')
            });
        },

        resetSelect() {
            this.selectedItems = [];
            $("[id^='table-inventory']").removeClass("selected-item");
        }
    }
})
</script>
