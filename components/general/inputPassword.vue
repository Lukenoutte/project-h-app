<template>
  <UInput color="gray" variant="outline" class="mt-2" 
    v-model="inputValue"
    v-if="inputPasswordType === 'password'"
    :ui="{ icon: { trailing: { pointer: '' } } }"
    :placeholder="placeholder" type="password">
    <template #trailing>
      <UButton
        color="gray"
        variant="link"
        icon="i-heroicons-eye-solid"
        :padded="false"
        @click="inputPasswordType = 'text'"
      />
    </template>
  </UInput>
  <UInput color="gray" variant="outline" class="mt-2" 
    v-model="inputValue"
    v-else
    :ui="{ icon: { trailing: { pointer: '' } } }"
    :placeholder="placeholder" type="text">
    <template #trailing>
      <UButton
        color="gray"
        variant="link"
        icon="i-heroicons-eye-slash-solid"
        :padded="false"
        @click="inputPasswordType = 'password'"
      />
    </template>
  </UInput>
</template>

<script setup>
  const inputPasswordType = ref('password')
  const emit = defineEmits(['on-change'])
  const inputValue = ref('')
  const props = defineProps({
    placeholder: String,
    valueProp: String
  })

  watch(inputValue, (newValue) => {
    emit('on-change', newValue);
  });
</script>