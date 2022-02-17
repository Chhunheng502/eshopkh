<template>
    <AppLayout>
        <div class="container bootstrap snippet">
            <FlashMessage />
            <div class="row">
                <div class="col-sm-4"> 
                    <div class="col-sm-10"><h3>{{ this.$page.props.auth.user.first_name + ' ' + this.$page.props.auth.user.last_name }}</h3></div>
                    <ul class="list-group">
                        <li class="list-group-item text-muted">Activity <i class="fa fa-dashboard fa-1x"></i></li>
                        <li class="list-group-item">
                            <strong>Total Orders</strong>
                            {{ totalOrders }}
                        </li>
                        <li class="list-group-item text-right">
                            <strong>Total Spending</strong>
                            {{ totalSpending }}
                        </li>
                        <li class="list-group-item text-right">
                            <strong>Total Coupons</strong>
                            {{ totalCoupons }}
                        </li>
                        <li class="list-group-item text-right">
                            <Link href="/user/wishlist">My Wishlist</Link>
                        </li>
                    </ul> 
                </div>
                <div class="col-sm-8">
                    <div class="tab-content">
                        <div class="tab-pane active" id="home">
                            <hr>
                            <form class="form" action="##" method="post" id="registrationForm">
                                <div class="form-group">
                                    <div class="col-xs-6">
                                        <label for="profile-first_name"><h4>First name</h4></label>
                                        <input type="text" class="form-control" name="first_name" id="profile-first_name" v-model="first_name" :disabled="!showReset" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-xs-6">
                                        <label for="profile-last_name"><h4>Last name</h4></label>
                                        <input type="text" class="form-control" name="last_name" id="profile-last_name" v-model="last_name" :disabled="!showReset" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-xs-6">
                                        <label for="profile-email"><h4>Email</h4></label>
                                        <input type="email" class="form-control" name="email" id="profile-email" v-model="email" :disabled="!showReset" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-xs-6">
                                        <label for="profile-phone"><h4>Phone</h4></label>
                                        <input type="text" class="form-control" name="phone" id="profile-phone" v-model="phone" :disabled="!showReset" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-xs-6">
                                        <label for="profile-address"><h4>Address</h4></label>
                                        <input type="text" class="form-control" id="profile-address" v-model="address" :disabled="!showReset" />
                                    </div>
                                </div>
                                <div v-show="showReset" class="form-group">
                                    <div class="col-xs-6">
                                        <label for="password"><h4>New Password</h4></label>
                                        <input type="password" class="form-control" name="password" id="password" placeholder="New password" v-model="password" />
                                    </div>
                                </div>
                                <div v-show="showReset" class="form-group">
                                    <div class="col-xs-6">
                                        <label for="password2"><h4>Verify Password</h4></label>
                                        <input type="password" class="form-control" name="password2" id="password2" placeholder="Verify password" v-model="confirm_password" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-xs-12">
                                        <br>
                                        <button class="btn btn-lg btn-success" type="button" v-if="showReset" @click="update"><i class="glyphicon glyphicon-ok-sign"></i>Save</button>
                                        <button class="btn btn-lg" type="button" v-else @click="showReset = true"><i class="glyphicon glyphicon-repeat"></i>Reset</button>
                                    </div>
                                </div>
                            </form>
                        <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import { Inertia } from '@inertiajs/inertia'

import AppLayout from '@/Layouts/AppLayout.vue'
import FlashMessage from '@/Components/FlashMessage.vue'
import { Link } from '@inertiajs/inertia-vue3'

export default defineComponent({
    components: {
        AppLayout,
        FlashMessage,
        Link
    },

    props: {
        totalOrders: Number,
        totalSpending: Number,
        totalCoupons: Number
    },

    data() {
        return {
            form: new FormData(),
            first_name: this.$page.props.auth.user.first_name,
            last_name: this.$page.props.auth.user.last_name,
            email: this.$page.props.auth.user.email,
            phone: this.$page.props.auth.user.phone,
            address: this.$page.props.auth.user.address,
            password: "",
            confirm_password: "",
            showReset: false
        }
    },

    methods: {
        update() {
            this.form.append('_method', 'put');
            this.form.append('first_name', this.first_name);
            this.form.append('last_name', this.last_name);
            this.form.append('email', this.email);
            this.form.append('phone', this.phone);
            this.form.append('address', this.address);

            if(this.password != "") {
                this.form.append('password', this.password);
                this.form.append('confirm_password', this.confirm_password);
            }

            Inertia.post(`http://127.0.0.1:8000/user/${this.$page.props.auth.user.id}`, this.form, {
                onSuccess: () => this.showReset = false,
                onError: (e) => console.log(e)
            })
        },
    }
})
</script>
