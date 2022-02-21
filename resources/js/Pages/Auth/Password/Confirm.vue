<template>
    <AppLayout>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Confirm Password</div>
                        <div class="card-body">
                            Please confirm your password before continuing.
                            <form method="POST" action="{{ route('password.confirm') }}">
                                <div class="row mb-3">
                                    <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                                    <div class="col-md-6">
                                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                                        @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                </div>
                                <div class="row mb-0">
                                    <div class="col-md-8 offset-md-4">
                                        <button type="submit" class="btn btn-primary">
                                            Confirm Password
                                        </button>
                                        @if (Route::has('password.request'))
                                            <Link class="btn btn-link" :href="route('password.request')">
                                                Forgot Your Password?
                                            </Link>
                                        @endif
                                    </div>
                                </div>
                            </form>
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
