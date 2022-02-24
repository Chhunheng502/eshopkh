<template>
    <AppLayout>
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Reset Password</div>
                        <div class="card-body">
                            <div v-if="$page.props.session.status" class="alert alert-success" role="alert">
                                {{ $page.props.session.status }}
                            </div>
                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                                <div class="col-md-6">
                                    <input
                                        id="email"
                                        type="email"
                                        class="form-control"
                                        :class="{'is-invalid': errors.email}"
                                        name="email"
                                        v-model="email"
                                        required
                                        autocomplete="email"
                                        autofocus
                                    >
                                    <span v-if="errors.email" class="invalid-feedback" role="alert">
                                        <strong>{{ errors.email }}</strong>
                                    </span>
                                </div>
                            </div>
                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <Link
                                        :href="route('password.email')"
                                        method="post"
                                        :data="{email: email}"
                                        as="button"
                                        type="button"
                                        class="btn btn-primary"
                                    >
                                        Send Password Reset Link
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
        errors: Object
    },

    data() {
        return {
            email: this.$page.props.auth.user.email
        }
    }
})
</script>
