<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" href="/">eShop KH</Link>
        <button class="navbar-toggler" type="button">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item position-relative">
                    <a class="nav-link dropdown-toggle" href="#" @click="openMenDropdown = !openMenDropdown">
                    Men
                    </a>
                    <div
                        v-show="openMenDropdown"
                        class="position-fixed"
                        style="z-index:40;top:0;left:0;right:0;bottom:0"
                        @click="openMenDropdown = false"
                    > 
                    </div>
                    <div
                        v-show="openMenDropdown"
                        class="position-absolute mt-2 bg-light shadow-lg"
                        style="z-index:50"
                    >
                        <Link class="dropdown-item" href="/products/CM">Clothing</Link>
                        <Link class="dropdown-item" href="/products/SM">Shoes</Link>
                        <Link class="dropdown-item" href="/products/BM">Bags</Link>
                        <Link class="dropdown-item" href="/products/AM">Accessories</Link>
                    </div>
                </li>
                <li class="nav-item position-relative">
                    <a class="nav-link dropdown-toggle" href="#" @click="openWomenDropdown = !openWomenDropdown">
                    Women
                    </a>
                    <div
                        v-show="openWomenDropdown"
                        class="position-fixed"
                        style="z-index:40;top:0;left:0;right:0;bottom:0"
                        @click="openWomenDropdown = false"
                    > 
                    </div>
                    <div
                        v-show="openWomenDropdown"
                        class="position-absolute mt-2 bg-light shadow-lg"
                        style="z-index:50"
                    >
                        <Link class="dropdown-item" href="/products/CW">Clothing</Link>
                        <Link class="dropdown-item" href="/products/SW">Shoes</Link>
                        <Link class="dropdown-item" href="/products/BW">Bags</Link>
                        <Link class="dropdown-item" href="/products/AW">Accessories</Link>
                    </div>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" href="/contact">Contact</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" href="/about">About Us</Link>
                </li>
            </ul>
        </div>
        <div className="d-flex">
            <div className="d-flex mr-1 mt-1">
                <p className="p-1">{{ $store.state.itemInCart.length }}</p>
                <Link href="/checkout"> <img src="images/cart.png" width="30" height="30" style="cursor:pointer;margin-right:2px" alt="" /> </Link>
            </div>
            <div class="nav-item position-relative">
                <a class="nav-link text-secondary dropdown-toggle" href="#" @click="openUserDropdown = !openUserDropdown">
                Chhunheng Leng
                </a>
                <div
                    v-show="openUserDropdown"
                    class="position-fixed"
                    style="z-index:40;top:0;left:0;right:0;bottom:0"
                    @click="openUserDropdown = false"
                > 
                </div>
                <div
                    v-show="openUserDropdown"
                    class="position-absolute mt-2 bg-light shadow-lg"
                    style="z-index:50"
                >
                    <Link class="dropdown-item" href="">User Profile</Link>
                    <Link class="dropdown-item" href="">Coupon</Link>
                    <Link class="dropdown-item" href="">Track Orders</Link>
                    <Link class="dropdown-item" href="">Logout</Link>
                </div>
            </div>
        </div>
    </nav>

    <main>
        <slot> </slot>
    </main>
</template>

<script>
import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

export default defineComponent({
    components: {
        Link
    },

    data() {
        return {
            openMenDropdown: false,
            openWomenDropdown: false,
            openUserDropdown: false
        }
    }
})
</script>
