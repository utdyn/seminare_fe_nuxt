import Vue from 'vue'
import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import fontawesome from '@fortawesome/fontawesome';

config.autoAddCss = false

fontawesome.config = {
  autoAddCss: false,
};

library.add(fas, faTwitter);
dom.watch();

Vue.component('font-awesome-icon', FontAwesomeIcon)

