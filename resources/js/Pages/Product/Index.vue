<template>
    <AppLayout>
        <div>
            <div class="inline-style justify-content-between p-5">
                <select class="form-select" style="width:200px;margin-right:5px" v-model="sort" name="Sort By" id="sort-by">
                    <option value="" selected> Sort By... </option>
                    <option value="price_asc">Price : Low to High</option>
                    <option value="price_desc">Price : High to Low</option>
                </select>
                <form class="inline-style">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search"
                        v-model="search"
                        @keypress.enter.prevent="handleSearch"
                    />
                    <button class="btn btn-success my-2 my-sm-0" type="button" @click="handleSearch">Search</button>
                </form>
            </div>
            <div class="interface-main">
                <ProductCard v-for="product in products.data" :key="product.id" :product="product" />
            </div>
            <Pagination :links="products.links" class="my-3" />
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import { Inertia } from '@inertiajs/inertia'

import AppLayout from '@/Layouts/AppLayout.vue'
import ProductCard from '@/Components/ProductCard.vue'
import Pagination from '@/Components/Pagination.vue'

export default defineComponent({
    components: {
        AppLayout,
        ProductCard,
        Pagination
    },

    props: {
        products: Object,
        filters: Object
    },

    data() {
        return {
            sort: this.filters.sort ?? "",
            search: this.filters.search ?? ""
        }
    },

    watch: {
        sort: function(value) {
            Inertia.get(this.$page.url, {sort: value}, {
                preserveState: true,
                replace: true
            })
        }
    },

    methods: {
        handleSearch() {
            Inertia.get(this.$page.url, {search: this.search}, {
                preserveState: true,
                replace: true
            })
        }
    }
})
</script>
