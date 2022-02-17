<template>
    <AppLayout>
        <div class="w-50 p-5 mx-auto" style="min-height:100vh">
            <div class="mb-3 text-center">
                <h3> Create Account </h3>
            </div>
            <form>
                <div class="row mb-1">
                    <div class="col-md-6">
                        <label for="inputFName">First Name</label>
                        <input type="text" id="inputFName" class="form-control" placeholder="Enter first name" v-model="form.first_name" required />
                    </div>
                    <div class="col-md-6">
                        <label for="inputLName">Last Name</label>
                        <input type="text" id="inputLName" class="form-control" placeholder="Enter last Name" v-model="form.last_name" required />
                    </div>
                </div>
                <div class="mb-1">
                    <label for="inputEmail">Email</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Enter email" v-model="form.email" required />
                </div>
                <div class="row mb-1">
                    <div class="col-md-6">
                        <label for="inputPassword">Password</label>
                        <input type="password" id="inputPassword" class="form-control" placeholder="Enter password" v-model="form.password" required />
                    </div>
                    <div class="col-md-6">
                        <label for="inputCPassword">Confirm Password</label>
                        <input type="password" id="inputCPassword" class="form-control" placeholder="Enter password again" v-model="form.confirm_password" required />
                    </div>
                </div>
                <div class="row mt-3 mb-1">
                    <div class="col-md-6">
                        <label class="form-check-label mr-3"> Gender </label>
                        <div class="form-check mr-3">
                            <input class="form-check-input" type="radio" name="gender" id="male" value="M" v-model="form.gender" />
                            <label class="form-check-label" for="male">
                                Male
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gender" id="female" value="F" v-model="form.gender" />
                            <label class="form-check-label" for="female">
                                Female
                            </label>
                        </div>
                    </div>
                    <div class="col-md-6 mt-2">
                        <label for="age" class="form-label">Age</label>
                        <input type="range" class="form-range" id="age" min="1" max="100" v-model="form.age" />
                        <output id="userAge">{{ form.age }}</output>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="inputPhone">Phone</label>
                        <input type="number" id="inputPhone" class="form-control" placeholder="Enter phone" v-model="form.phone" required />
                    </div>
                    <div class="col-md-6">
                        <label for="inputAddress">Address</label>
                        <input type="text" id="inputAddress" class="form-control" placeholder="Russey Keo, Phnom Penh" v-model="form.address" required />
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-lg btn-primary btn-block text-uppercase" @click="register">Create</button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>

<style>
.center-style {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    border: 1px solid black;
    border-radius: 10px;
}
</style>

<script>
import { defineComponent } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import AppLayout from '@/Layouts/AppLayout.vue'

export default defineComponent({
    components: {
        AppLayout
    },

    data() {
        return {
            form: useForm({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confirm_password: "",
                gender: "M",
                age: 18,
                phone: "",
                address: ""
            })
        }
    },

    methods: {
        register() {
            this.form.post('http://127.0.0.1:8000/user', {
                onSuccess: () => this.form.reset('password'),
                onError: (e) => console.log(e)
            });
        }
    }
})
</script>
