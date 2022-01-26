<template>
    <input
        type="text"
        class="form-control"
        placeholder="Search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['modelValue'],

    emits: ['update:modelValue']
})
</script>
