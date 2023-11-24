<template>
  <UInput color="gray" variant="outline" class="mt-2" 
    :ui="{ icon: { trailing: { pointer: '' } } }"
    :placeholder="placeholder" :type="inputPasswordType">
    <template #trailing>
      <UButton
        color="gray"
        variant="link"
        icon="i-heroicons-eye-solid"
        :padded="false"
        @click="setInputType"
      />
    </template>
  </UInput>
</template>

<script setup>
  const inputPasswordType = ref('password')
  const props = defineProps({
    placeholder: String,
  })

  const setInputType = () => {
    const textType = 'text'
    const passwordType = 'password'
    const isText = inputPasswordType.value === textType
    inputPasswordType.value = isText ? passwordType : textType
  }
</script>