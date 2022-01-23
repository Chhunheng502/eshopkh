<template>
    <footer class="bg-secondary text-white text-center" style="margin-top:auto">
        <div class="container p-4">
            <div class="row">
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase">eShop KH</h5>
                    <p>
                    Welcome to Eshop KH – the web's one-stop shop for apparel of all kinds.
                    We offer a wide selection of blank apparel styles, and brands for wearing every day.
                    Our goal is to satisfy the apparel needs of online shoppers with plenty of options, 
                    a user-friendly site and affordable prices.
                    </p>
                </div>
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Follow Us</h5>
                    <ul class="list-unstyled mb-0">
                        <li>
                        <a href="https://twitter.com/EshopKh" class="text-white"><i class="fa fa-facebook-official mr-2" aria-hidden="true"></i>Facebook</a>
                        </li>
                        <li>
                        <a href="https://twitter.com/EshopKh" class="text-white"><i class="fa fa-instagram mr-2" aria-hidden="true"></i>Instagram</a>
                        </li>
                        <li>
                        <a href="https://twitter.com/EshopKh" class="text-white"><i class="fa fa-twitter mr-2" aria-hidden="true"></i>Twitter</a>
                        </li>
                    </ul>
                </div>  
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase mb-0">Let Us Help You</h5>
                    <ul class="list-unstyled">
                        <li>
                        <Link to="/user-profile" class="text-white">Your Account</Link>
                        </li>
                        <li>
                        <Link to="/track-orders" class="text-white">Your Order</Link>
                        </li>
                        <li>
                        <Link to="/shopping-policies" class="text-white">Shopping Policies</Link>
                        </li>
                        <li>
                        <Link to="/faq" class="text-white">Help</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="text-center p-3" style="background-color:rgba(0, 0, 0, 0.2)">
            © 2021 Copyright:
            <a class="text-white ml-1" href="https://eshopkh.netlify.app/">eshopkh.netifly.app</a>
        </div>
    </footer>
</template>

<script>
import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

export default defineComponent({
    components: {
        Link
    }
})
</script>
