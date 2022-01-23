<template>
    <main>
        <CollectionSlide :collections="collections" />
        <hr>
        <ProductSlide :products="collections[0]?.detail" />
        <hr>
        <WeeklyContent :weeklyContents="weeklyContents" />
        <hr>
        <MonthlyContent :monthlyContents="monthlyContents" />
    </main>
</template>

<script>
import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import axios from 'axios'

import CollectionSlide from './CollectionSlide.vue'
import ProductSlide from './ProductSlide.vue'
import WeeklyContent from './WeeklyContent.vue'
import MonthlyContent from './MonthlyContent.vue'

export default defineComponent({
    components: {
        Link,
        CollectionSlide,
        ProductSlide,
        WeeklyContent,
        MonthlyContent
    },

    data() {
        return {
            collections: [],
            homeContents: []
        }
    },

    created() {
        this.fetchCollections();
        this.fetchHomeContents();
    },

    computed: {
        weeklyContents() {
            return this.homeContents.filter(content => content.type == 1);
        },

        monthlyContents() {
            return this.homeContents.filter(content => content.type == 2);
        }
    },

    methods: {
        fetchCollections() {
            axios.get('http://127.0.0.1:8000/api/collections/get').then(response => {
                this.collections = response.data;
            });
        },

        fetchHomeContents() {
            axios.get('http://127.0.0.1:8000/api/home/content/get').then(response => {
                this.homeContents = response.data;
            })
        }
    }
})
</script>
