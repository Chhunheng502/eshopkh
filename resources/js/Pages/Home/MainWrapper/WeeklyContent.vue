<template>
    <div>
        <h2 class="text-center m-3"> This week's highlights </h2>
        <div class="d-flex justify-content-around flex-wrap">
            <div
                v-for="content in weeklyContents"
                :key="content.id"
                class="card border-0"
                style="width:22rem"
            >
                <img class="card-img-top" :src="content.image" alt="" />
                <div class="card-body">
                    <h5 class="card-title">{{ content.title }}</h5>
                    <p class="card-text">{{ content.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        weeklyContents: Array
    },
})
</script>
