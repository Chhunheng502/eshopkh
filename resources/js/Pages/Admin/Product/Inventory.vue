<template>
    <DashboardLayout>
        <h2 class="dashboard-header">Product Inventory</h2>
        <div class="dashboard-event">
            <div class="d-flex">
                <div class="form-group">
                    <label for="sort-by-gender">Sort by gender:</label>
                    <select class="form-select" v-model="genderValue" @change="handleSort" id="sort-by-gender">
                        <option value="all">All</option>
                        <option value="m">Men</option>
                        <option value="w">Women</option>
                    </select>
                </div>
                <div class="form-group" style="margin-left:10px">
                    <label for="sort-by-type">Sort by type:</label>
                    <select class="form-select" v-model="typeValue" @change="handleSort" id="sort-by-type">
                        <option value="all">All</option>
                        <option value="c">Clothing</option>
                        <option value="s">Shoe</option>
                        <option value="b">Bag</option>
                        <option value="a">Accessory</option>
                    </select>
                </div>
            </div>
            <div class="d-flex">
                <!-- create a navigation page instead -->
                <button type="button" class="btn btn-success"><i class="fa fa-plus-circle"></i> Product</button>
                <SearchInput v-model="searchRef" />
            </div>
        </div>
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                    <tr v-if="!selectedItems.length">
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    <tr v-else>
                        <th colspan="5">
                            <form>
                                <button type="button" class="btn btn-primary"><i class="fa fa-arrow-circle-right"></i> Collection</button>
                                <button type="button" class="btn btn-danger mx-2">Delete</button>
                            </form>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="product in products.data"
                        :id="'table-inventory-' + product.id"
                        @click.ctrl="selectItem('table-inventory-' + product.id, product)"
                    >
                        <td><img :src="product.detail.primary_image" width="50" height="50" style="object-fit:cover" alt=""></td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>
                            <button type="button" class="btn-sm btn-primary"><i class="fa fa-edit"></i></button>
                            <button type="button" class="btn-sm btn-danger mx-1"><i class="fa fa-trash"></i></button>
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
    background-color: green;
}
</style>

<script>
import { defineComponent } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import throttle from 'lodash/throttle'
import $ from 'jquery'

import DashboardLayout from '../../../Layouts/DashboardLayout.vue'
import SearchInput from '../../../Components/SearchInput.vue'
import Pagination from '../../../Components/Pagination.vue'

export default defineComponent({
    components: {
        DashboardLayout,
        SearchInput,
        Pagination
    },

    props: {
        products: Object,
        filters: String
    },

    data() {
        return {
            genderValue: 'all',
            typeValue: 'all',
            searchRef: this.filters,
            selectedItems: []
        }
    },

    watch: {
        searchRef: throttle(function(value) {
            Inertia.get(this.$page.url, {search: value}, {
                preserveState: true,
                replace: true
            })
        }, 500)
    },

    methods: {
        handleSort() {
            Inertia.get(this.$page.url, {gs: this.genderValue, ts: this.typeValue}, {
                preserveState: true,
                replace: true
            })
        },

        selectItem(id, newItem) {
            if($('#' + id).hasClass("selected-item")) {
                $('#' + id).removeClass("selected-item");
                this.selectedItems = this.selectedItems.filter(item => item.id != newItem.id);
            } else {
                $('#' + id).addClass("selected-item");
                this.selectedItems.push(newItem);
            }
        }
    }
})
</script>
