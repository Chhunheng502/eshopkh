<template>
    <div>
        <div @click="show = true">
            <slot name="wrapper"></slot>
        </div>

        <transition name="fade">
            <div v-show="show" class="modal">
                <div class="modal__content">
                    <div class="modal__header">
                        <slot name="header"></slot>
                    </div>
                    <slot name="content"></slot>
                    <div class="modal__footer">
                        <slot name="footer"></slot>
                    </div>
                    <a @click="close" href="#" class="modal__close">&times;</a>
                </div>
            </div>
        </transition>
    </div>
</template>

<style>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, .7);
  transition: all .4s;
}

.modal__header {
  text-align: center;
  margin-bottom: 20px;
}


.modal__content {
  border-radius: 4px;
  position: relative;
  width: 500px;
  max-width: 90%;
  background: #fff;
  padding: 1em 2em;
}

.modal__footer {
  text-align: right;
  margin-top: 20px;
}

.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
        show: false
    }
  },

  methods: {
    close() {
      this.show = false;
    }
  }
})
</script>
