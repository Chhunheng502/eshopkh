<template>
    <AppLayout>
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Reset Password</div>
                        <div class="card-body">
                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" :class="{'is-invalid': errors.email}" name="email" v-model="form.email" required autocomplete="email" autofocus>
                                    <span v-if="errors.email" class="invalid-feedback" role="alert">
                                        <strong>{{ errors.email }}</strong>
                                    </span>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" :class="{'is-invalid': errors.password}" name="password" v-model="form.password" required autocomplete="new-password">
                                    <span v-if="errors.password" class="invalid-feedback" role="alert">
                                        <strong>{{ errors.password }}</strong>
                                    </span>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Confirm Password</label>
                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" v-model="form.password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>
                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <Link
                                        :href="route('password.update')"
                                        method="post"
                                        :data="form"
                                        as="button"
                                        type="button"
                                        class="btn btn-primary"
                                    >
                                        Reset Password
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import AppLayout from '@/Layouts/AppLayout.vue'

export default defineComponent({
    components: {
        Link,
        AppLayout
    },

    props: {
        token: String,
        email: String,
        errors: Object
    },

    data() {
        return {
            form: {
                token: this.token,
                email: this.email,
                password: "",
                password_confirmation: ""
            }
        }
    }
})
</script>
