import { renderSuspended } from 'nuxt-vitest/utils'
import Header from '../../../components/general/header.vue'

describe('Header tests', () => {
    test('should mount header', async () => {
        const wrapper = renderSuspended(Header)
        expect(wrapper).toBeTruthy()
    })
})
