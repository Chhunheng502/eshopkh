<template>
    <div class="slider-method mr-3" style="transition:all 0.3s" id="home-slider-1">
        <div class="card shadow-sm" style="width:320px;height:350px">
            <Link :href="(isAdmin ? '/admin/collection/' : '/collections/') + collection.id">
                <img
                    :src="collection.image"
                    class="card-img-top"
                    height="280"
                    style="cursor:pointer;object-fit:cover"
                    alt=""
                />
            </Link>
            <div class="card-body">
                <div v-if="isAdmin" class="card-title d-flex justify-content-between">
                    <p class="text-dark">
                        {{ collection.name }}
                        <span class="text-secondary">{{ collection.detail.length }}</span>
                    </p>
                    <form class="d-flex align-items-center">
                        <Modal ref="updateCollectionModal">
                            <template v-slot:wrapper>
                                <button type="button" class="btn-sm btn-primary" :disabled="form.progress"><i class="fa fa-edit"></i></button>
                            </template>

                            <template v-slot:header>
                                <h5>Update Collection</h5>
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
                                <button type="button" class="btn btn-secondary" @click="$refs.updateCollectionModal.close()">Close</button>
                                <button type="button" class="btn btn-primary" style="margin-left:5px" @click="updateCollection">Done</button>
                            </template>
                        </Modal>
                        <button type="button" class="btn-sm btn-danger mx-1" @click="deleteCollection"><i class="fa fa-trash"></i></button>
                    </form>
                </div>
                <h5 v-else class="card-title">{{ collection.name }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

import { Link, useForm } from '@inertiajs/inertia-vue3'
import Modal from '@/Components/Modal'

export default defineComponent({
    components: {
        Link,
        Modal
    },

    props: {
        collection: Object,
        isAdmin: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            form: useForm({
                _method: 'put',
                name: this.collection.name,
                image: this.collection.image
            })
        }
    },

    methods: {
        getFileUpload(event) {
            this.form.image = event.target.files[0];
        },

        updateCollection() {
            this.form.post(`http://127.0.0.1:8000/api/collections/${this.collection.id}`, {
                onSuccess: () => console.log('success')
            });

            this.$refs.updateCollectionModal.close()
        },

        deleteCollection() {
            useForm({_method: 'delete'}).post(`http://127.0.0.1:8000/api/collections/${this.collection.id}`, {
                preserveScroll: true,
                onBefore: () => confirm('Are you sure you want to delete this collection?'), // improve style on alert
                onSuccess: () => console.log('success')
            });
        }
    }
})
</script>
