require('./bootstrap');

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

import route from 'ziggy';
import { Ziggy } from './ziggy';

import store from './store/index'

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mixin({methods: {route: route}})
      .use(store)
      .mount(el)
  },
})