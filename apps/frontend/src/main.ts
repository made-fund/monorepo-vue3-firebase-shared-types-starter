import type { ChatMessage } from '@shared/types'

import '@/assets/styles/typography.scss'
import '@/assets/styles/variables.scss'
import '@/assets/styles/resets.scss'
import '@/assets/styles/global.scss'
import '@/assets/styles/animations.scss'

import App from '@/App.vue'
import router from '@/router'
import vFocus from '@/directives/vFocus'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUser } from '@/stores/user.store'

const app = createApp(App)
app.directive('focus', vFocus)
app.use(createPinia())

await useUser().initialize()

app.use(router)
app.mount('#app')
