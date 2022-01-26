<template>
    <DashboardLayout>
        <h2 class="dashboard-header">Customer Contacts</h2>
        <div class="dashboard-event">
            <div class="form-group">
                <label for="sort-by-gender">Sort by gender:</label>
                <select class="form-select" @change="handleSort" id="sort-by-gender">
                    <option value="all">All</option>
                    <option value="M">Men</option>
                    <option value="F">Women</option>
                </select>
            </div>
            <SearchInput v-model="searchRef" />
        </div>
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users.data" :key="user.id">
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

<script>
import { defineComponent } from 'vue'
import { Inertia } from '@inertiajs/inertia'

import DashboardLayout from '../../../Layouts/DashboardLayout.vue'
import SearchInput from '../../../Components/SearchInput.vue'
import Pagination from '../../../Components/Pagination.vue'

export default defineComponent({
    components: {
        DashboardLayout,
        SearchInput,
        Pagination
    },

    props: {
        users: Object
    },

    methods: {
        handleSort(event) {
            Inertia.get(this.$page.url, {sort: event.target.value}, {
                preserveState: true,
                replace: true
            })
        }
    }
})
</script>
