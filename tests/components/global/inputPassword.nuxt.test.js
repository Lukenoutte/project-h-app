import { shallowMount } from '@vue/test-utils'
import InputPassword from '../../../components/general/inputPassword.vue'

describe('input password tests', async () => {
    it('should mount component', async () => {
        const wrapper = shallowMount(InputPassword)
        expect(wrapper).toBeTruthy()
    })
    it('should found input password', async () => {
        const wrapper = shallowMount(InputPassword)
        const inputPassword = wrapper.find('[data-testid="input-password"]')
        expect(inputPassword.exists()).toBe(true)
    })
    it('should have the correct type', async () => {
        const wrapper = shallowMount(InputPassword)
        const inputPassword = wrapper.find('[data-testid="input-password"]')
        expect(inputPassword.attributes().type).toBe('password')
        wrapper.vm.inputPasswordType = 'text'
        await wrapper.vm.$nextTick()
        expect(inputPassword.attributes().type).toBe('text')
    })
    it('should have the correct icon', async () => {
        const wrapper = shallowMount(InputPassword)
        expect(wrapper.vm.getIconToShow()).toBe('i-heroicons-eye-solid')
        wrapper.vm.inputPasswordType = 'text'
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.getIconToShow()).toBe('i-heroicons-eye-slash-solid')
    })
})
