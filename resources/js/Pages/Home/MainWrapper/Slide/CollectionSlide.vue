<template>
    <div class="position-relative m-3">
        <h3 style="margin-left:80px"> Shop Top Categories </h3>
        <div class="d-flex p-2 mt-2" style="width:90%;margin:auto;overflow:hidden">
            <CollectionCard v-for="collection in $page.props.collections" :key="collection.id" :collection="collection" />
        </div>
        <div class="headslider-Lbtn"> <button @click="slideLeft"> <i class="fa fa-arrow-left" aria-hidden="true"></i> </button></div>
        <div class="headslider-Rbtn"> <button @click="slideRight"> <i class="fa fa-arrow-right" aria-hidden="true"></i> </button></div> 
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import $ from 'jquery'

import CollectionCard from '@/Components/CollectionCard.vue'

export default defineComponent({
    components: {
        CollectionCard
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
            $(".slider-method" + "#home-slider-1").css("transform", "translateX(" + pct + "%)");
        },

        slideRight() {

            this.slideIndex = (this.slideIndex >= this.$page.props.collections.length -1) ? 0 : this.slideIndex + 1;
            var pct = this.slideIndex * (-105);
            $(".slider-method" + "#home-slider-1").css("transform", "translateX(" + pct + "%)");
        },
    }
})
</script>