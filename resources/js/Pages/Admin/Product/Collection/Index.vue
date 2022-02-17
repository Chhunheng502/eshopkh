<template>
    <DashboardLayout>
        <!-- improve progress to work properly -->
        <progress v-if="form.progress" :value="form.progress.percentage" max="100">
            {{ form.progress.percentage }}%
        </progress>
        <h2 class="dashboard-header">Product Collections</h2>
        <FlashMessage />
        <div class="d-flex justify-content-end">
            <Modal ref="newCollectionModal">
                <template v-slot:wrapper>
                    <button type="button" class="btn btn-success" :disabled="form.progress"><i class="fa fa-plus-circle"></i> Collection</button>
                </template>

                <template v-slot:header>
                    <h5>Create New Collection</h5>
                </template>

                <template v-slot:content>
                    <form class="form-group">
                        <label for="collection-name">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            style="margin-bottom:10px"
                            placeholder="Enter Name"
                            v-model="form.name"
                        >
                    </form>
                    <form class="form-group">
                        <label for="collection-image">Upload Image</label>
                        <input type="file" class="form-control" id="collection-image" @change="getFileUpload">
                    </form>
                </template>

                <template v-slot:footer>
                    <button type="button" class="btn btn-secondary" @click="$refs.newCollectionModal.close()">Close</button>
                    <button type="button" class="btn btn-primary" style="margin-left:5px" @click="create">Done</button>
                </template>
            </Modal>
        </div>
        <div class="album py-3">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <CollectionCard
                        v-for="collection in collections.data"
                        :key="collection.id"
                        :collection="collection"
                        :isAdmin="true"
                    />
                </div>
            </div>
        </div>
        <div>
            <Pagination :links="collections.links" />
        </div>
    </DashboardLayout>
</template>

<script>
import { defineComponent } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import FlashMessage from '@/Components/FlashMessage.vue'
import Modal from '@/Components/Modal.vue'
import CollectionCard from '@/Components/CollectionCard.vue'
import Pagination from '@/Components/Pagination.vue'

export default defineComponent({
    components: {
        DashboardLayout,
        FlashMessage,
        Modal,
        CollectionCard,
        Pagination
    },

    props: {
        collections: Object
    },

    data() {
        return {
            showModal: true,
            form: useForm({
                name: "",
                image: ""
            })
        }
    },

    methods: {
        getFileUpload(event) {
            this.form.image = event.target.files[0];
        },

        create() {
            this.form.post('http://127.0.0.1:8000/collections', {
                onSuccess: () => this.$refs.newCollectionModal.close(),
                onError: (e) => console.log(e)
            });
        }
    }
})
</script>
