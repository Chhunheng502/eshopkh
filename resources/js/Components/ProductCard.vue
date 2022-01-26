<template>
    <div class="headslider-display slider-method" id="home-slider-2">
        <div class="info">
            <div class="row">
                <div class="price col-md-6">
                    <h5 style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ product.name }}</h5>
                    <h5 class="price-text-color">{{ product.price }}</h5>
                </div>
                <div class="rating hidden-sm col-md-6">
                    <i class="price-text-color fa fa-star"></i>
                    <i class="price-text-color fa fa-star"></i>
                </div>
            </div>
            <div class="product-image">
                <img :src="product.detail.primary_image" alt="" />
            </div>
            <div class="info">
                <div class="separator clear-left">
                    <p class="btn-add">
                        <i class="fa fa-shopping-cart"></i><span class="text-primary" @click="addToCart" style="cursor:pointer">Add To Cart</span>
                    </p>
                    <p class="btn-details">
                        <Link :href="'/products/' + product.type + '/' + product.id" style="text-decoration:none">
                            <i class="fa fa-list text-dark"></i><span style="cursor:pointer">More Details</span>
                        </Link>
                    </p>
                </div>
            </div>
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
