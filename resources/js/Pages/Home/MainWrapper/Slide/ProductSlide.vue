<template>
    <div class="position-relative m-3">
        <h3 style="margin-left:80px"> eShopKH Top Sellers </h3>
        <div class="headslider">
            <ProductCard v-for="detail in $page.props.collection" :key="detail.id" :product="detail.product" />
        </div>
        <div class="headslider-Lbtn"> <button @click="slideLeft"> <i class="fa fa-arrow-left" aria-hidden="true"></i> </button></div>
        <div class="headslider-Rbtn"> <button @click="slideRight"> <i class="fa fa-arrow-right" aria-hidden="true"></i> </button></div> 
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import $ from 'jquery'

import ProductCard from '@/Components/ProductCard.vue'

export default defineComponent({
    components: {
        ProductCard
    },

    data() {
        return {
            slideIndex: 0
        }
    },

    methods: {
        slideLeft() {

            this.slideIndex = (this.slideIndex < 1) ? 0 : this.slideIndex - 1;
            var pct = this.slideIndex * (-105);
            $(".slider-method" + "#home-slider-2").css("transform", "translateX(" + pct + "%)");
        },

        slideRight() {

            this.slideIndex = (this.slideIndex >= this.$page.props.collection.length -1) ? 0 : this.slideIndex + 1;
            var pct = this.slideIndex * (-105);
            $(".slider-method" + "#home-slider-2").css("transform", "translateX(" + pct + "%)");
        },
    }
})
</script>
