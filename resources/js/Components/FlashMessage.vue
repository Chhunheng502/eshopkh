<template>
    <div v-if="show" class="alert">
        {{ $page.props.flash.message }}
    </div>
</template>

<style>
.alert {
    position: fixed;
    top: 90%;
    right: 10%;
    z-index: 80;
    padding: 5px 20px;
    background-color: rgb(90, 196, 228);
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            show: false
        }
    },
    
    watch: {
        '$page.props.flash': {
            handler() {
                if(this.$page.props.flash.message) {
                    this.show = true;
                    setTimeout(() => this.show = false, 4000)
                }
            },
                deep: true,
            },
    },
})
</script>
