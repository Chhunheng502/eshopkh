<template>
    <AppLayout>
        <div>
            <div class="inline-style p-5">
                <select class="form-select" style="width:200px;margin-right:5px" @change="sortProducts($event)" name="Sort By" id="sort-by">
                    <option value="default" selected> Sort By... </option>
                    <option value="asc">Price : Low to High</option>
                    <option value="desc">Price : High to Low</option>
                </select>
                <form class="inline-style">
                    <input
                        class="form-control form-control"
                        type="search"
                        v-model="searchRef"
                        placeholder="Search"
                    />
                    <button class="btn btn-success my-2 my-sm-0" type="button" @click="handleSearch">Search</button>
                </form>
            </div>
            <div class="interface-main">
                <div class="interface-mainbar">
                    <ProductItem v-for="product in sortableProducts" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import AppLayout from '../../Layouts/AppLayout.vue'
import ProductItem from './Item.vue'

export default defineComponent({
    components: {
        AppLayout,
        ProductItem
    },

    props: {
        products: Array || Object
    },

    data() {
        return {
            searchRef: "",
            sortableProducts: this.products
        }
    },

    methods: {
        sortProducts(event) {
            if(event.target.value == 'asc') {
                this.sortableProducts = [...this.products].sort((a,b) => {
                        return a.price - b.price;
                    });
            } else if(event.target.value == 'desc') {
                this.sortableProducts = [...this.products].sort((a,b) => {
                    return b.price - a.price;
                });
            } else {
                this.sortableProducts = this.products;
            }
        },

        handleSearch() {
            this.sortableProducts = this.products.filter(product => product.name.includes(this.searchRef));
        }
    }
})
</script>
