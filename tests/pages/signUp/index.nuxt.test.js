import { shallowMount } from '@vue/test-utils'
import SignUp from '../../../pages/signUp'

describe('sign up tests', async () => {
    it('should mount page', async () => {
        const wrapper = shallowMount(SignUp)
        expect(wrapper).toBeTruthy()
    })
    it('should show error empty fields when has no data on the inputs', async () => {
        const wrapper = shallowMount(SignUp)
        await wrapper.vm.submitSignUp()
        const { name, email, password, comfirmPass } = wrapper.vm.errors
        expect(name).toBe('name is a required field')
        expect(email).toBe('email is a required field')
        expect(password).toBe('password is a required field')
        expect(comfirmPass).toBe('comfirmPass is a required field')
    })
})
