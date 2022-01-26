<template>
    <AppLayout>
        <div class="detail-page-main">
            <div class="detail-page-flex-container">
                <div 
                    class="detail-page-primary-img container-1-flex-item-1"
                    :style="'background-image:url(' + product.detail.primary_image + ')'"
                >
                </div>
                <div 
                    class="detail-page-secondary-img-1 container-1-flex-item-1"
                    :style="'background-image:url(' + product.detail.secondary_image1 + ')'"
                >
                </div>
                <div class="detail-page-right-content container-1-flex-item-1">
                    <p style="line-height:10%"><b>{{ product.name }}</b></p>
                    <p style="line-height:80%">{{ product.feature }}</p>
                    <p style="line-height:200%">{{ product.price }}</p>
                    <button class="detail-page-add-to-cart-button" @click="addToCart">Add To Cart</button>
                    <button class="detail-page-wish-list" @click="">Wishlist <i class="fa fa-star-o" aria-hidden="true"></i></button>
                </div>  
            </div>
            <div class="detail-page-lower-part"> 
                <p><b>Name</b></p>
                <p>Feature</p>
            </div>
            <div class="detail-page-flex-container-2">
                <div class="detail-page-info container-2-flex-item-1">{{ product.detail.info }}</div>
                <div class="detail-page-highlight container-2-flex-item-2">
                    <p style="margin-left:24px;color:#727272">Highlights</p>
                    <ul>
                        <li v-for="hightlight in productHighlights">{{ hightlight }}</li>
                    </ul>
                </div>
                <div
                    class="detail-page-secondary-img-2 container-2-flex-item-3"
                    :style="'background-image:url(' + product.detail.secondary_image2 + ')'"
                >
                </div>  
            </div>
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import AppLayout from '../../Layouts/AppLayout.vue'

export default defineComponent({
    components: {
        AppLayout
    },

    props: {
        product: Object
    },

    computed: {
        productHighlights() {
            return String(this.product.detail.highlight).split(",");
        }
    },

    methods: {
        addToCart() {
            this.$store.commit('addItemToCart', this.product);
        }
    }
})
</script>
