<template>
    <div class="slider-method mr-3" style="transition:all 0.3s" id="home-slider-1">
        <div class="card shadow-sm" style="width:320px;height:350px">
            <Link :href="'/collections/' + collection.id" method="post" :data="collection.detail">
                <img
                    :src="collection.image"
                    class="card-img-top"
                    height="280"
                    style="cursor:pointer;object-fit:cover"
                    alt=""
                />
            </Link>
            <div class="card-body">
                <h5 class="card-title">{{ collection.name }}</h5>
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
        collection: Object
    }
})
</script>
