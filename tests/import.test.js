describe('import vue components', () => {
    test('import footer as expected', async () => {
        const footer = await import('../components/general/footer.vue')
        expect(footer).toBeDefined()
    })

    test('import header as expected', async () => {
        const header = await import('../components/general/header.vue')
        expect(header).toBeDefined()
    })
})
