<template>
    <DashboardLayout>
        <h2 class="dashboard-header">Product Collections</h2>
        <div class="d-flex justify-content-end">
            <Modal ref="myChild">
                <template v-slot:wrapper>
                    <button type="button" class="btn btn-success"><i class="fa fa-plus-circle"></i> Collection</button>
                </template>

                <template v-slot:header>
                    <h5>Create New Collection</h5>
                </template>

                <template v-slot:content>
                    <input type="text" class="form-control" placeholder="Enter Name" style="margin-bottom:10px">
                    <form class="form-group">
                        <label for="collection-image">Upload Image</label>
                        <input type="file" class="form-control" id="collection-image">
                    </form>
                </template>

                <template v-slot:footer>
                    <button type="button" class="btn btn-secondary" @click="$refs.myChild.close()">Close</button>
                    <button type="button" class="btn btn-primary" style="margin-left:5px">Done</button>
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
import DashboardLayout from '../../../Layouts/DashboardLayout.vue'
import Modal from '../../../Components/Modal.vue'
import CollectionCard from '../../../Components/CollectionCard.vue'
import Pagination from '../../../Components/Pagination.vue'

export default defineComponent({
    components: {
        DashboardLayout,
        Modal,
        CollectionCard,
        Pagination
    },

    data() {
        return {
            showModal: true
        }
    },

    props: {
        collections: Object
    }
})
</script>
