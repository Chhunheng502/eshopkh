<template>
    <div>
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your Cart</span>
            <span class="badge bg-primary rounded-pill">{{ $store.state.itemInCart.length }}</span>
        </h4>
        <ul class="list-group mb-3">
            <li v-for="item in $store.getters.sortedItemInCart" :key="item.id" class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">
                        <i class="fa fa-minus-circle" @click="" style="cursor:pointer;color:red" aria-hidden="true"></i>
                        {{ item.name }}
                        <span><i class="fa fa-times mx-1" aria-hidden="true"></i>{{ getQuantity(item.id) }}</span>
                    </h6>
                    <small class="text-muted">{{ item.feature }}</small>
                </div>
                <span class="text-muted">{{ item.price }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                <h6 class="my-0">Promo code</h6>
                </div>
                <span class="text-success">- {{ totalReduction }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                <h6 class="my-0">Delivery cost</h6>
                </div>
                <span class="text-success">{{ deliveryCost }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>{{ totalCost }}</strong>
            </li>
        </ul>
        <form class="card p-2">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Promo code" />
                <button type="submit" class="btn btn-secondary" @click="">Redeem</button>
            </div>
        </form>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    computed: {
        totalPrice() {
            return this.$store.state.itemInCart.reduce((total, num) => total + num.price, 0);
        },

        totalReduction() {
            return 0;
        },

        deliveryCost() {
            return this.totalPrice > 0 ? 5 : 0;
        },

        totalCost() {
            return this.totalPrice - this.totalReduction - this.deliveryCost;
        }
    },

    methods: {
        getQuantity(id) {
            return this.$store.state.itemInCart.filter(item => item.id === id).length;
        }
    }
})
</script>
