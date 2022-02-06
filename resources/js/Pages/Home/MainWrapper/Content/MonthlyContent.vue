<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1> Best Collection of <br /> This Month </h1>
                <p> Give your wardrobe a re-vamp for the season ahead with the <br/> impressive collection of men’s designer clothes at eShop KH. </p>
                <div class="text-center" style="margin-top:100px">
                <Link href='/products/cm'> <button type="button" class="btn btn-primary"> Shop Now </button> </Link>
                    <div class="p-3 mt-5">
                        <img src="https://preview.colorlib.com/theme/estore/assets/img/collection/collection1.png" alt="" />
                    </div>
                </div>
            </div>
            <div class="col p-3">
                <div class="d-flex justify-content-center">
                    <img src="https://preview.colorlib.com/theme/estore/assets/img/collection/collection2.png" alt="" />
                </div>
            </div>
            <div class="col">
                <div 
                    v-for="content in monthlyContents"
                    :key="content.id"
                    class="d-flex align-items-center justify-content-center mb-5"
                >
                    <h5 class="p-1 mr-2">{{ content.title }}<br /> <span class="text-primary">{{ content.content }}</span></h5> 
                    <img :src="content.image" width="150" height="180" alt="" />
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
        monthlyContents: Array
    },
})
</script>
