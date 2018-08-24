import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zh from 'assets/lang/zh.json'
import en from 'assets/lang/en.json'

Vue.use(VueI18n)

const locale = 'en'

const messages = {
  en: en,
  zh: zh
}

const i18n = new VueI18n({
    locale,
    messages
})

export default i18n
