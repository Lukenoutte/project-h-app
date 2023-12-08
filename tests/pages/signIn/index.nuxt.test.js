import { shallowMount, mount } from '@vue/test-utils'
import SignIn from '../../../pages/signIn'

describe('sign in tests', async () => {
    it('should mount page', async () => {
        const wrapper = shallowMount(SignIn)
        expect(wrapper).toBeTruthy()
    })
    it('should show error empty fields when has no data on the inputs', async () => {
        const wrapper = mount(SignIn)
        await wrapper.vm.submitSignIn()
        const { email, password } = wrapper.vm.errors
        expect(email).toBe('email is a required field')
        expect(password).toBe('password is a required field')
    })
    it('should show error empty password when only email is filled', async () => {
        const wrapper = mount(SignIn)
        const signInWrapper = wrapper.find('[data-testid="signin-wrapper"]')
        const emailInput = signInWrapper.find('[data-testid="email-input"]')
        emailInput.setValue('fakeEmail@gmail.com')
        await wrapper.vm.submitSignIn()
        const { email, password } = wrapper.vm.errors
        expect(email).toBe(undefined)
        expect(password).toBe('password is a required field')
    })
    it('should show error empty email when only pass is filled', async () => {
        const wrapper = mount(SignIn)
        const signInWrapper = wrapper.find('[data-testid="signin-wrapper"]')
        const passwordInput = signInWrapper.find('[data-testid="password-input"]')
        passwordInput.setValue('12345678')
        await wrapper.vm.submitSignIn()
        const { email, password } = wrapper.vm.errors
        expect(email).toBe('email is a required field')
        expect(password).toBe(undefined)
    })
    it('should show error when email is invalid', async () => {
        const wrapper = mount(SignIn)
        const signInWrapper = wrapper.find('[data-testid="signin-wrapper"]')
        const emailInput = signInWrapper.find('[data-testid="email-input"]')
        emailInput.setValue('wrongEmail')
        await wrapper.vm.submitSignIn()
        const { email } = wrapper.vm.errors
        expect(email).toBe('email must be a valid email')
    })
    it('should show error when password is least 6 characters', async () => {
        const wrapper = mount(SignIn)
        const signInWrapper = wrapper.find('[data-testid="signin-wrapper"]')
        const passwordInput = signInWrapper.find('[data-testid="password-input"]')
        passwordInput.setValue('123')
        await wrapper.vm.submitSignIn()
        const { password } = wrapper.vm.errors
        expect(password).toBe('password must be at least 6 characters')
    })
})
