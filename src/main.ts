import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'
import router from './router'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'

// 创建应用和 pinia 实例
const app = createApp(App)
const pinia = createPinia()

// 创建其他实例
const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    messages: {
        en: {
            login: {
                title: 'Login',
                username: 'Username',
                password: 'Password',
                submit: 'Login'
            }
        },
        zh: {
            login: {
                title: '登录',
                username: '用户名',
                password: '密码',
                submit: '登录'
            }
        }
    }
})

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light'
    }
})

// 使用插件
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(vuetify)

// 添加全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err, info)
}

// 添加全局请求拦截器
import axios from 'axios'
axios.interceptors.response.use(
  response => {
    // 添加安全相关的响应头
    response.headers['X-Content-Type-Options'] = 'nosniff'
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

// 挂载应用
app.mount('#app')
