<script setup>
  const toast = useToast()
  toast.add({ 
  title: 'Não foi possivel fazer login.', 
  icon: 'i-heroicons-exclamation-triangle',
  color: 'red',
  timeout: 1500
  })
</script>