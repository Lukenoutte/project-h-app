import { shallowMount } from '@vue/test-utils'
import Header from '../../../components/general/header.vue'
import { createTestingPinia } from '@pinia/testing'
import { defineStore } from 'pinia'

const useAuthenticationStore = defineStore('authentication', {
    state: () => ({ isAuthenticated: false }),
})

describe('header tests', async () => {
    it('should mount header', async () => {
        const wrapper = shallowMount(Header)
        expect(wrapper).toBeTruthy()
    })
    it('should have a button to toggle dark mode', async () => {
        const wrapper = shallowMount(Header)
        const buttonDarkMode = wrapper.find('[data-testid="dark-mode"]')
        expect(buttonDarkMode.exists()).toBe(true)
    })
    it('should have a sign in button when not authenticated', async () => {
        const wrapper = shallowMount(Header)
        const buttonSignIn = wrapper.find('[data-testid="sign-in"]')
        expect(buttonSignIn.exists()).toBe(true)
    })
    it('should not have a sign in button when authenticated', async () => {
        const pinia = createTestingPinia()
        const authenticationStore = useAuthenticationStore(pinia)
        authenticationStore.$state.isAuthenticated = true
        const wrapper = shallowMount(Header, {
            global: {
                plugins: [pinia],
            },
        })
        const buttonSignIn = wrapper.find('[data-testid="sign-in"]')
        expect(buttonSignIn.exists()).toBe(false)
    })
    it('should have the user menu button when authenticated', async () => {
        const pinia = createTestingPinia()
        const authenticationStore = useAuthenticationStore(pinia)
        authenticationStore.$state.isAuthenticated = true
        const wrapper = shallowMount(Header, {
            global: {
                plugins: [pinia],
            },
        })
        const buttonUserMenu = wrapper.find('[data-testid="user-menu"]')
        expect(buttonUserMenu.exists()).toBe(true)
    })
    it('should have the correct translation to portuguese', async () => {
        const pinia = createTestingPinia()
        const authenticationStore = useAuthenticationStore(pinia)
        authenticationStore.$state.isAuthenticated = false
        const wrapper = shallowMount(Header, {
            global: {
                plugins: [pinia],
            },
        })
        const localeDropDown = wrapper.find('[data-testid="locale-select"]')
        const buttonSignIn = wrapper.find('[data-testid="sign-in"]')
        expect(localeDropDown.attributes().modelvalue).toBe('pt-br')
        expect(buttonSignIn.attributes().title).toBe('Entrar')
    })
    it('should have the correct translation to english', async () => {
        const pinia = createTestingPinia()
        const authenticationStore = useAuthenticationStore(pinia)
        authenticationStore.$state.isAuthenticated = false
        const wrapper = shallowMount(Header, {
            global: {
                plugins: [pinia],
            },
        })
        wrapper.vm.locale = 'en'
        await wrapper.vm.$nextTick()
        const localeDropDown = wrapper.find('[data-testid="locale-select"]')
        const buttonSignIn = wrapper.find('[data-testid="sign-in"]')
        expect(localeDropDown.attributes().modelvalue).toBe('en')
        expect(buttonSignIn.attributes().title).toBe('Sign In')
    })
    it('should have the correct translation to english', async () => {
        const pinia = createTestingPinia()
        const authenticationStore = useAuthenticationStore(pinia)
        authenticationStore.$state.isAuthenticated = false
        const wrapper = shallowMount(Header, {
            global: {
                plugins: [pinia],
            },
        })
        wrapper.vm.locale = 'en'
        await wrapper.vm.$nextTick()
        const localeDropDown = wrapper.find('[data-testid="locale-select"]')
        const buttonSignIn = wrapper.find('[data-testid="sign-in"]')
        expect(localeDropDown.attributes().modelvalue).toBe('en')
        expect(buttonSignIn.attributes().title).toBe('Sign In')
    })
})
