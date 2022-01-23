<template>
    <AppLayout>
        <div class="row">
            <div class="col-md-6">
                <div class="w-50 mt-5 mx-auto">
                    <h3> Contact Information </h3>
                    <div class="mt-3">
                        <p><i class="fa fa-facebook-official mr-2" aria-hidden="true"></i> eShop KH </p>
                        <p><i class="fa fa-instagram mr-2" aria-hidden="true"></i> eshopkh </p>
                        <p><i class="fa fa-envelope-o mr-2" aria-hidden="true"></i> sales@eshopkh.com </p>
                        <p><i class="fa fa-map-marker mr-2" aria-hidden="true"></i> #6, St 446, Sangkat Toul Tom Poung I, Khan Chamkarmon, Phnom Penh </p>
                        <p><i class="fa fa-phone mr-2" aria-hidden="true"></i> 012-345-678 </p>
                        <p><i class="fa fa-twitter mr-2" aria-hidden="true"></i> eShopKH </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 text-center">
                <img src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?cs=srgb&dl=pexels-graphicgumcom-1115804.jpg&fm=jpg" alt="" style="width:70%;height:80%;object-fit:cover" />
            </div>
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import AppLayout from '../Layouts/AppLayout.vue'

export default defineComponent({
    components: {
        AppLayout
    }
})
</script>
