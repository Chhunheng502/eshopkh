<template>
    <AppLayout>
        <div class="center-style">
            <div class="mb-3 text-center">
                <i class="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
                <h3> User </h3>
            </div>
            <form>
                <div class="form-group">
                    <label for="name"> Email: </label>
                    <input
                        type="text"
                        class="form-control"
                        style="width:300px"
                        placeholder="Enter email"
                        v-model="form.email"
                    />
                </div>
                <div class="form-group my-2"> 
                    <label for="password"> Password: </label>
                    <input 
                        type="password"
                        class="form-control"
                        style="width:300px"
                        placeholder="Enter password"
                        v-model="form.password"
                    />
                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-primary" @click="login"> Login </button>
                </div>
                <div class="my-2">
                    <span style="margin-right:5px">Not Registered Yet?</span>
                    <Link href="/user/register">Create Account</Link>
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
import { Link, useForm } from '@inertiajs/inertia-vue3'

import AppLayout from '@/Layouts/AppLayout.vue'

export default defineComponent({
    components: {
        Link,
        AppLayout
    },

    data() {
        return {
            form: useForm({
                email: "",
                password: ""
            })
        }
    },

    methods: {
        login() {
            this.form.post('http://127.0.0.1:8000/user/login', {
                onSuccess: () => this.form.reset('password'),
                onError: (e) => console.log(e)
            });
        }
    }
})
</script>
