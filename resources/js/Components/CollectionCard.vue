<template>
    <div class="slider-method mr-3" style="transition:all 0.3s" id="home-slider-1">
        <div class="card shadow-sm" style="width:320px;height:350px">
            <Link :href="(isAdmin ? '/admin/collection/' : '/collections/') + collection.id">
                <img
                    :src="collection.image"
                    class="card-img-top"
                    height="280"
                    style="cursor:pointer;object-fit:cover"
                    alt=""
                />
            </Link>
            <div class="card-body">
                <div v-if="isAdmin" class="card-title d-flex justify-content-between">
                    <p class="text-dark">
                        {{ collection.name }}
                        <span class="text-secondary">{{ collection.detail.length }}</span>
                    </p>
                    <form>
                        <button type="button" class="btn-sm btn-primary"><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn-sm btn-danger mx-1"><i class="fa fa-trash"></i></button>
                    </form>
                </div>
                <h5 v-else class="card-title">{{ collection.name }}</h5>
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
        collection: Object,
        isAdmin: {
            type: Boolean,
            default: false
        }
    }
})
</script>
