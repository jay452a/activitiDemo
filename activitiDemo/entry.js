/**
 * Created by lenovo on 2017/7/24.
 */
import "./src/css/demo.less";
import Vue from "vue/dist/vue.js";
import vueResource from "vue-resource";

import Act from "./src/js/demo.js"
let $ = require('jquery');
window.$ = $;
Vue.use(vueResource)
window.Vue=Vue

let act =new Act()
act.init("mainFlow")