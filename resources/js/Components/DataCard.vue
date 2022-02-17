<template>
    <div class="col-xl-4">
        <div class="card card-stats text-dark">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">{{ data.title }}</h5>
                        <span class="h2 font-weight-bold mb-0">{{ data.value }}</span>
                    </div>
                    <div class="col-auto">
                        <slot></slot>
                    </div>
                </div>
                <p v-if="data.growth" class="mt-3 mb-0 text-sm">
                    <span v-if="data.growth >= 0" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{ data.growth.toFixed(2) }}%</span>
                    <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{ data.growth.toFixed(2) }}%</span>
                    <span class="text-nowrap" style="margin-left:5px">Since last month</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        data: Object
    }
})
</script>
