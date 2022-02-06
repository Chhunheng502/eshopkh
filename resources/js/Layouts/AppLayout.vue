<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" href="/">
            <AppLogo />
        </Link>
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
                        <Link class="dropdown-item" href="/products/cm">Clothing</Link>
                        <Link class="dropdown-item" href="/products/sm">Shoes</Link>
                        <Link class="dropdown-item" href="/products/bm">Bags</Link>
                        <Link class="dropdown-item" href="/products/am">Accessories</Link>
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
                        <Link class="dropdown-item" href="/products/cw">Clothing</Link>
                        <Link class="dropdown-item" href="/products/sw">Shoes</Link>
                        <Link class="dropdown-item" href="/products/bw">Bags</Link>
                        <Link class="dropdown-item" href="/products/aw">Accessories</Link>
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
        <div className="d-flex" style="margin-right:10px">
            <Link href="/user/login" class="nav-link text-secondary" v-if="!$page.props.auth.user"> Login </Link>
            <div class="nav-item position-relative" v-else>
                <a class="nav-link text-secondary dropdown-toggle" href="#" @click="openUserDropdown = !openUserDropdown">
                {{ $page.props.auth.user.first_name }}
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
                    style="z-index:50;"
                >
                    <Link class="dropdown-item" href="">User Profile</Link>
                    <Link class="dropdown-item" href="">Coupon</Link>
                    <Link class="dropdown-item" href="">Track Orders</Link>
                    <Link class="dropdown-item" href="">Logout</Link>
                </div>
            </div>
            <div className="d-flex mr-1 mt-1">
                <Link href="/checkout"> <img src="http://127.0.0.1:8000/images/cart.png" width="30" height="30" style="cursor:pointer;margin-right:2px" alt="" /> </Link>
                <p className="p-1">{{ $store.state.itemInCart.length }}</p>
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
import AppLogo from '@/Components/AppLogo.vue'

export default defineComponent({
    components: {
        Link,
        AppLogo
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
