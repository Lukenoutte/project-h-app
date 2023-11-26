<template>
    <div class="px-5 md:flex md:justify-center md:items-center h-full">
        <div class="w-full md:w-[500px]">
            <span class="font-semibold">{{ $t('sign-up') }}</span>
            <UForm :state="values" @submit="submitSignUp">
                <UCard class="mt-4 w-full">
                    <UFormGroup name="name" :error="!!errors.name">
                        <UInput color="gray" variant="outline" v-bind="name" :placeholder="$t('name')" />
                    </UFormGroup>
                    <UFormGroup name="email" :error="!!errors.email">
                        <UInput color="gray" variant="outline" class="mt-2" v-bind="email" placeholder="E-mail" />
                    </UFormGroup>
                    <UFormGroup name="password" :error="!!errors.password">
                        <GeneralInputPassword v-bind="password" :placeholder="$t('password')" />
                    </UFormGroup>
                    <UFormGroup name="comfirmPass" :error="!!errors.comfirmPass">
                        <GeneralInputPassword v-bind="comfirmPass" :placeholder="$t('comfirm-password')" />
                    </UFormGroup>
                </UCard>
                <div class="flex justify-between">
                    <UButton
                        class="mt-3 px-4"
                        icon="i-heroicons-arrow-left"
                        size="sm"
                        color="white"
                        variant="solid"
                        :ui="{ rounded: 'rounded-xl' }"
                        to="/signin"
                        :title="$t('back')"
                    />
                    <UButton
                        class="mt-3 px-7 py-2"
                        :label="$t('finish')"
                        :title="$t('finish')"
                        type="submit"
                        color="primary"
                        :ui="{ rounded: 'rounded-xl' }"
                    />
                </div>
            </UForm>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().min(6).required(),
    comfirmPass: yup.string().min(6).required(),
})
const { defineInputBinds, values, errors, validate } = useForm({
    validationSchema,
})
const name = defineInputBinds('name')
const email = defineInputBinds('email')
const password = defineInputBinds('password')
const comfirmPass = defineInputBinds('comfirmPass')

const { signUp } = useAuthenticationStore()

const submitSignUp = async () => {
    const validationErrors = await validate()
    if (!validationErrors.valid) return
    signUp()
}
</script>
