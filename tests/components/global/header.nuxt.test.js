import { mount } from '@vue/test-utils'
import Header from '../../../components/general/header.vue'
import { createTestingPinia } from '@pinia/testing'
import { defineStore } from 'pinia'

const useAuthenticationStore = defineStore('authentication', {
    state: () => ({ isAuthenticated: false }),
})

describe('Header tests', () => {
    it('should mount header', async () => {
        const wrapper = mount(Header)
        expect(wrapper).toBeTruthy()
    })
    it('should have a button to toggle dark mode', async () => {
        const wrapper = mount(Header)
        const button = wrapper.find('[data-testid="dark-mode"]')
        expect(button.exists()).toBe(true)
    })
    it('should have a sign in button when not authenticated', async () => {
        const wrapper = mount(Header)
        const button = wrapper.find('[data-testid="sign-in"]')
        expect(button.exists()).toBe(true)
    })
    it('should not have a sign in button when authenticated', async () => {
        const pinia = createTestingPinia()
        const authenticationStore = useAuthenticationStore(pinia)
        authenticationStore.$state.isAuthenticated = true
        const wrapper = mount(Header, {
            global: {
                plugins: [pinia],
            },
        })
        const button = wrapper.find('[data-testid="sign-in"]')
        expect(button.exists()).toBe(false)
    })
    it('should have the user menu button when authenticated', async () => {
        const pinia = createTestingPinia()
        const authenticationStore = useAuthenticationStore(pinia)
        authenticationStore.$state.isAuthenticated = true
        const wrapper = mount(Header, {
            global: {
                plugins: [pinia],
            },
        })
        const button = wrapper.find('[data-testid="user-menu"]')
        expect(button.exists()).toBe(true)
    })
})
