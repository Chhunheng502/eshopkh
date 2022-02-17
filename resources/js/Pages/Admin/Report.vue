<template>
    <DashboardLayout>
        <h2 class="dashboard-header">Report Page</h2>
        <div class="dashboard-event">
            <div class="form-group">
                <select class="form-select" v-model="period">
                    <option value="all">All</option>
                    <option v-for="month in months" :value="month">{{ month }}</option>
                </select>
            </div>
        </div>
        <div class="row my-2">
            <DataCard :data="revenue_data">
                <div class="icon icon-shape text-success">
                    <i class="fa fa-usd fa-2x" aria-hidden="true"></i>
                </div>
            </DataCard>
            <DataCard :data="user_data">
                <div class="icon icon-shape text-primary">
                    <i class="fa fa-user fa-2x" aria-hidden="true"></i>
                </div>
            </DataCard>
            <DataCard :data="order_data">
                <div class="icon icon-shape text-danger">
                    <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                </div>
            </DataCard>
        </div>
        <div class="row">
            <div class="col-md-6">
                <canvas id="sales-report" width="400" height="400"></canvas>
            </div>
            <div class="col-md-6 my-2">
                <canvas id="most-purchased-report" width="400" height="400"></canvas>
            </div>
        </div>
    </DashboardLayout>
</template>

<script>
import { defineComponent } from 'vue'
import Chart from 'chart.js/auto';

import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import DataCard from '@/Components/DataCard.vue'
import { Inertia } from '@inertiajs/inertia';

Chart.defaults.color = "#fff";

export default defineComponent({
    components: {
        DashboardLayout,
        DataCard
    },

    props: {
        salesMonthly: Array,
        mostPurchased: Array,
        totalRevenue: Number,
        totalUsers: Number,
        totalOrders: Number,
        filters: Object
    },

    data() {
        return {
            period: this.filters['period'] ?? 'all',
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            revenue_data: {
                title: 'Total Revenue',
                value: this.totalRevenue,
            },
            user_data: {
                title: 'Total Users',
                value: this.totalUsers,
            },
            order_data: {
                title: 'Total Orders',
                value: this.totalOrders,
            },
        }
    },

    watch: {
        period: function(value) {
            Inertia.get(this.$page.url, {period: value}, {
                replace: true
            })
        },
    },

    mounted() {
        const lineRef = document.getElementById('sales-report');
        new Chart(lineRef, {
            type: 'line',
            data: {
                labels: this.months,
                datasets: [{
                    label: 'Sales Report',
                    data: this.salesMonthly,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(75, 192, 192)',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        });

        const doughnutRef = document.getElementById('most-purchased-report');
        new Chart(doughnutRef, {
            type: 'doughnut',
            data: {
                labels: this.mostPurchased.map(obj => obj.product_name),
                datasets: [{
                    label: 'Most Purchased',
                    data: this.mostPurchased.map(obj => obj.total_quantity),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(56, 201, 95)',
                        'rgb(180, 63, 235)'
                    ],
                    hoverOffset: 4
                }]
            },
            hoverOffset: 4
        });
    }
 })
</script>
