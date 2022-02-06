<template>
    <div class="text-center p-0 m-0">
        <div class="background-image">
            <img src="images/background.jpg" height="600" style="width:100%;object-fit:cover" alt="" />
            <div class="center-items-inImage">
                <div>
                    <h1>eShop KH</h1>
                    <p>A place you can find everything in one click</p>
                </div>
                <form class="inline-style">
                    <input
                        type="search"
                        class="form-control mr-sm-2"
                        placeholder="Search"
                        v-model="search"
                        @keypress.enter.prevent="handleSearch"
                    />
                    <button class="btn btn-success my-2 my-sm-0" type="button" @click="handleSearch">Search</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Inertia } from '@inertiajs/inertia'

export default defineComponent({
    data() {
        return {
            search: ""
        }
    },

    methods: {
        handleSearch() {
            Inertia.get('/products', {search: this.search});
        }
    }
})
</script>
