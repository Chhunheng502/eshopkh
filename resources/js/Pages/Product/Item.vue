<template>
    <div class="product-container">
        <div class="image">
            <Link :href="'/products/' + product.type + '/' + product.id">
                <img class="product-img" :src="product.detail.primary_image" alt="" />
            </Link>
            <p class="favorite"></p>
        </div>
        <div class="product-detail">
        <p class="btn-add">
            <i class="fa fa-shopping-cart"></i><span class="text-primary" @click="addToCart"  style="cursor:pointer"> Add </span>
        </p>
            <p style="font-weight:bold;font-size:18px">{{ product.name }}</p>
            <p>{{ product.feature }}</p>
            <p>{{ product.price }}</p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

export default defineComponent({
    components: {
        Link
    },

    props: {
        product: Object
    },

    methods: {
        addToCart() {
            this.$store.commit('addItemToCart', this.product);
        }
    }
})
</script>
