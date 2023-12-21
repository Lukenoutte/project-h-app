import { shallowMount, mount } from '@vue/test-utils'
import SignUp from '../../../pages/signUp'

describe('sign up tests', async () => {
    it('should mount page', async () => {
        const wrapper = shallowMount(SignUp)
        expect(wrapper).toBeTruthy()
    })
    it('should show error empty fields when has no data on the inputs', async () => {
        const wrapper = shallowMount(SignUp)
        await wrapper.vm.submitSignUp()
        const { name, email, password, confirmPass } = wrapper.vm.errors
        expect(name).toBe('name is a required field')
        expect(email).toBe('email is a required field')
        expect(password).toBe('password is a required field')
        expect(confirmPass).toBe('confirmPass is a required field')
    })
    it('should show error when email is invalid', async () => {
        const wrapper = mount(SignUp)
        const signUpWrapper = wrapper.find('[data-testid="signup-wrapper"]')
        const emailInput = signUpWrapper.find('[data-testid="email-input"]')
        emailInput.setValue('wrongEmail')
        await wrapper.vm.submitSignUp()
        const { email } = wrapper.vm.errors
        expect(email).toBe('email must be a valid email')
    })
    it('should show error when password is least 6 characters', async () => {
        const wrapper = mount(SignUp)
        const signUpWrapper = wrapper.find('[data-testid="signup-wrapper"]')
        const passwordInput = signUpWrapper.find('[data-testid="password-input"]')
        const confirmPasswordInput = signUpWrapper.find('[data-testid="confirm-pass-input"]')
        passwordInput.setValue('123')
        confirmPasswordInput.setValue('123')
        await wrapper.vm.submitSignUp()
        const { password, confirmPass } = wrapper.vm.errors
        expect(password).toBe('password must be at least 6 characters')
        expect(confirmPass).toBe('confirmPass must be at least 6 characters')
    })
    it('should show error when password and confirm pass are different', async () => {
        const wrapper = mount(SignUp)
        const signUpWrapper = wrapper.find('[data-testid="signup-wrapper"]')
        const passwordInput = signUpWrapper.find('[data-testid="password-input"]')
        const confirmPasswordInput = signUpWrapper.find('[data-testid="confirm-pass-input"]')
        passwordInput.setValue('12345678')
        confirmPasswordInput.setValue('differentPassword')
        await wrapper.vm.submitSignUp()
        const { password, confirmPass } = wrapper.vm.errors
        expect(password).toBe('passwords must match')
        expect(confirmPass).toBe('passwords must match')
    })
})
