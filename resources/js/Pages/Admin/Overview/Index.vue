<template>
    <DashboardLayout>
        <h2 class="dashboard-header">Overview Page</h2>
        <div class="row" style="margin-bottom:30px">
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
                <canvas id="sales-overview" width="400" height="400"></canvas>
            </div>
            <div class="col-md-6 my-2">
                <canvas id="most-purchased-overview" width="400" height="400"></canvas>
            </div>
        </div>
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Total Cost</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in recentOrders">
                        <td>{{ order.user.first_name + ' ' + order.user.last_name }}</td>
                        <td>{{ order.user.phone }}</td>
                        <td>{{ order.total_cost }}</td>
                        <td>{{ order.created_at }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </DashboardLayout>
</template>

<script>
import { defineComponent } from 'vue'
import Chart from 'chart.js/auto';

import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import DataCard from '@/Components/DataCard.vue'

Chart.defaults.color = "#fff";

export default defineComponent({
    components: {
        DashboardLayout,
        DataCard
    },

    props: {
        salesWeekly: Array,
        mostPurchased: Array,
        totalRevenue: Object,
        totalUsers: Object,
        totalOrders: Object,
        recentOrders: Array
    },

    data() {
        return {
            revenue_data: {
                title: 'Total Revenue',
                value: this.totalRevenue.new,
                growth: ((this.totalRevenue.new - this.totalRevenue.old) / this.totalRevenue.old) * 100
            },
            user_data: {
                title: 'New Users',
                value: this.totalUsers.new,
                growth: ((this.totalUsers.new - this.totalUsers.old) / this.totalUsers.old) * 100
            },
            order_data: {
                title: 'Total Orders',
                value: this.totalOrders.new,
                growth: ((this.totalOrders.new - this.totalOrders.old) / this.totalOrders.old) * 100
            },
        }
    },

    mounted() {
        const barRef = document.getElementById('sales-overview');
        new Chart(barRef, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Sales This Month',
                    data: this.salesWeekly,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 205, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 1
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

        const doughnutRef = document.getElementById('most-purchased-overview');
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
