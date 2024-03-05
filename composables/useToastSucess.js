export const useToastSucess = (title) => {
    const toast = useToast()
    toast.add({
        title,
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 1500,
    })
}
