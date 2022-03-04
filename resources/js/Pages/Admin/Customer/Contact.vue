<template>
    <DashboardLayout>
        <h2 class="dashboard-header">Customer Contacts</h2>
        <FlashMessage />
        <div class="dashboard-event">
            <div class="form-group">
                <label for="sort-by-gender">Sort by gender:</label>
                <select class="form-select" id="sort-by-gender" v-model="gender">
                    <option value="all">All</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <SearchInput v-model="search" />
        </div>
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                    <tr v-if="!selectedItems.length">
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                    <tr v-else>
                        <th colspan="5">
                            <form class="d-flex justify-content-center">
                                <Modal ref="couponModal">
                                    <template v-slot:wrapper>
                                        <button type="button" class="btn btn-primary">Give Coupon</button>
                                    </template>

                                    <template v-slot:header>
                                        <h5>Give Coupon</h5>
                                    </template>

                                    <template v-slot:content>
                                        <select class="form-select" v-model="form.type">
                                            <option value="FD">Free Delivery</option>
                                            <option value="D">Discount</option>
                                            <option value="S">Save</option>
                                            <option value="B">Buy</option>
                                        </select>
                                        <div v-if="form.type != 'FD'" class="input-group my-2">
                                            <input type="number" class="form-control" id="coupon-value" v-model="amount" />
                                            <div class="input-group-append">
                                                <span class="input-group-text">
                                                    {{ 
                                                        form.type == 'D' ? '%' :
                                                        form.type == 'S' ? '$' : 
                                                        form.type == 'B' ? 'Get one' : ''
                                                    }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="my-2 border" style="width:100%;height:200px;overflow:auto">
                                            <div
                                                class="d-flex align-items-center py-1 my-2 hover-effect"
                                                v-for="product in products"
                                                :class="{'text-danger': (form.product_id == product.id)}"
                                                @click="form.product_id = product.id"
                                            >
                                                <img :src="product.detail.primary_image" width="50" height="50" style="object-fit:cover" alt="">
                                                <p class="mx-2">{{ product.name }}</p>
                                            </div>
                                        </div>
                                        <div class="form-group my-2">
                                            <label for="expired-date">Expired Date</label>
                                            <input type="date" class="form-control" id="expired-date" v-model="form.expired_date">
                                        </div>
                                    </template>

                                    <template v-slot:footer>
                                        <button type="button" class="btn btn-secondary" @click="$refs.couponModal.close()">Close</button>
                                        <button type="button" class="btn btn-primary" style="margin-left:5px" @click="storeCoupon">Done</button>
                                    </template>
                                </Modal>
                            </form>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="user in users.data"
                        :id="'table-contact-' + user.id"
                        @click.ctrl="selectItem(user.id)"
                    >
                        <td>{{ user.first_name + ' ' + user.last_name }}</td>
                        <td>{{ user.gender }}</td>
                        <td>{{ user.email }}</td>
                        <td>0{{ user.phone }}</td>
                        <td>{{ user.address }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination :links="users.links" />
    </DashboardLayout>
</template>

<style>
.selected-item {
    background-color: #4FC3A1;
}

.hover-effect:hover {
  background-color: rgb(199, 199, 195);
}
</style>

<script>
import { defineComponent } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import throttle from 'lodash/throttle'
import $ from 'jquery'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import FlashMessage from '@/Components/FlashMessage.vue'
import SearchInput from '@/Components/SearchInput.vue'
import Modal from '@/Components/Modal.vue'
import Pagination from '@/Components/Pagination.vue'

export default defineComponent({
    components: {
        DashboardLayout,
        FlashMessage,
        SearchInput,
        Modal,
        Pagination
    },

    props: {
        users: Object,
        products: Array,
        filters: Array
    },

    data() {
        return {
            gender: this.filters['gender'] ?? 'all',
            search: "",
            form: {
                user_ids: [],
                product_id: 0,
                type: "FD",
                expired_date: new Date()
            },
            amount: 0,
            selectedItems: []
        }
    },

    watch: {
        gender: function(value) {
            Inertia.get(this.$page.url, {gender: value}, {
                preserveState: true,
                replace: true
            })
        },

        search: throttle(function(value) {
            Inertia.get(this.$page.url, {search: value}, {
                preserveState: true,
                replace: true
            })
        }, 500)
    },

    methods: {
        selectItem(id) {
            if($('#table-contact-' + id).hasClass("selected-item")) {
                $('#table-contact-' + id).removeClass("selected-item");
                this.selectedItems = this.selectedItems.filter(itemId => itemId != id);
            } else {
                $('#table-contact-' + id).addClass("selected-item");
                this.selectedItems.push(id);
            }
        },

        storeCoupon() {

            this.form.user_ids = this.selectedItems;
            this.form.type += (this.amount > 0 ? this.amount : ''); //problem here
            
            Inertia.post('http://127.0.0.1:8000/coupon', this.form, {
                onSuccess: () => {
                    this.$refs.couponModal.close();
                    this.resetSelect();
                },
                onError: (e) => console.log(e),
                preserveState: true
            })
        },

        resetSelect() {
            this.selectedItems = [];
            $("[id^='table-contact']").removeClass("selected-item");
        }
    },
})
</script>
