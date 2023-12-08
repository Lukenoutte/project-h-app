<template>
    <UInput
        color="gray"
        variant="outline"
        data-testid="input-password"
        class="mt-2"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        :placeholder="placeholder"
        :type="inputPasswordType"
    >
        <template #trailing>
            <UButton color="gray" variant="link" :icon="getIconToShow()" :padded="false" @click="setInputType" />
        </template>
    </UInput>
</template>

<script setup>
const textType = 'text'
const passwordType = 'password'
const inputPasswordType = ref(passwordType)
const props = defineProps({
    placeholder: String,
})

const setInputType = () => {
    const isText = inputPasswordType.value === textType
    inputPasswordType.value = isText ? passwordType : textType
}

const getIconToShow = () => {
    if (inputPasswordType.value === passwordType) return 'i-heroicons-eye-solid'
    if (inputPasswordType.value === textType) return 'i-heroicons-eye-slash-solid'
}
</script>
