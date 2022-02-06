<template>
    <AppLayout>
        <div>
            <AppHeader />
            <MainWrapper />
            <AppFooter />
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import AppHeader from './AppHeader.vue'
import MainWrapper from './MainWrapper/Index.vue'
import AppFooter from './AppFooter.vue'

export default defineComponent({
    components: {
        AppLayout,
        AppHeader,
        MainWrapper,
        AppFooter
    },

    props: {
        collections: Array,
        collection: Array
    }
})
</script>
