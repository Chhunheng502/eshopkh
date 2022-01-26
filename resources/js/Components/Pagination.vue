<template>
    <nav>
        <ul class="pagination flex-wrap justify-content-center">
            <li class="page-item" :class="{ 'active': link.active }" v-for="link in links">
                <Link
                    class="page-link"
                    :href="link.url"
                    v-html="link.label"
                >
                </Link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

export default defineComponent({
    components: {
        Link
    },

    props: {
        links: Object
    }
})
</script>
