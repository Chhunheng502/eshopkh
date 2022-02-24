<template>
    <AppLayout>
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Verify Your Email Address</div>

                        <div class="card-body">
                            <div v-if="$page.props.session.resent" class="alert alert-success" role="alert">
                                A fresh verification link has been sent to your email address.
                            </div>
                            <div v-else>
                                Before proceeding, please check your email for a verification link.
                                If you did not receive the email,
                                <Link :href="route('verification.resend')" method="post">
                                    click here to request another
                                </Link>
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

    data() {
        return {

        }
    }
})
</script>
