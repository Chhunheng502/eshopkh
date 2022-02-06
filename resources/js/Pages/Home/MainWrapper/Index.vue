<template>
    <main>
        <CollectionSlide />
        <hr>
        <ProductSlide />
        <hr>
        <!-- <WeeklyContent :weeklyContents="weeklyContents" />
        <hr>
        <MonthlyContent :monthlyContents="monthlyContents" /> -->
    </main>
</template>

<script>
import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import CollectionSlide from './Slide/CollectionSlide.vue'
import ProductSlide from './Slide/ProductSlide.vue'
import WeeklyContent from './Content/WeeklyContent.vue'
import MonthlyContent from './Content/MonthlyContent.vue'

export default defineComponent({
    components: {
        Link,
        CollectionSlide,
        ProductSlide,
        WeeklyContent,
        MonthlyContent
    },

    computed: {
        // weeklyContents() {
        //     return this.homeContents.filter(content => content.type == 1);
        // },

        // monthlyContents() {
        //     return this.homeContents.filter(content => content.type == 2);
        // }
    }
})
</script>
