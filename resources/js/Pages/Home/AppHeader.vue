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
                    <input class="form-control mr-sm-2" type="search" v-model="searchRef" placeholder="Search"/>
                    <button class="btn btn-success my-2 my-sm-0" type="button" @click="handleSearch">Search</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            searchRef: ""
        }
    },

    methods: {
        handleSearch() {
            window.location.href = '/products?search=' + this.searchRef;
        }
    }
})
</script>
