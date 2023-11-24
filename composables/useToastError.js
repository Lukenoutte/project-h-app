export const useToastError = (title) => {
  const toast = useToast()
  toast.add({ 
    title, 
    icon: 'i-heroicons-exclamation-triangle',
    color: 'red',
    timeout: 1500
   })
}