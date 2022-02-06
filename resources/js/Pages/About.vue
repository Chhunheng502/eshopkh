<template>
    <AppLayout>
        <div class="row">
            <div class="col-md-6">
                <div class="w-75 mt-5 mx-auto">
                    <h3> About Us </h3>
                    <p> Welcome to Eshop KH – the web's one-stop shop for apparel of all kinds. 
                        We offer a wide selection of blank apparel styles, and brands for wearing every day. 
                        Our goal is to satisfy the apparel needs of online shoppers with plenty of options, 
                        a user-friendly site and affordable prices.
                    </p>
                </div>
            </div>
            <div class="col-md-6 text-center">
                <img src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?cs=srgb&dl=pexels-fauxels-3184423.jpg&fm=jpg" alt="" style="width:70%;height:80%;object-fit:cover" />
            </div>
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import AppLayout from '@/Layouts/AppLayout.vue'

export default defineComponent({
    components: {
        AppLayout
    }
})
</script>
