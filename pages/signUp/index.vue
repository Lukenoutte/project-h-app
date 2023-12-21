<template>
    <div class="px-5 md:flex md:justify-center md:items-center h-full" data-testid="signup-wrapper">
        <div class="w-full md:w-[500px]">
            <span class="font-semibold">{{ $t('sign-up') }}</span>
            <UForm :state="values" @submit="submitSignUp">
                <UCard class="mt-4 w-full">
                    <UFormGroup name="name" :error="!!errors.name">
                        <UInput
                            data-testid="name-input"
                            color="gray"
                            variant="outline"
                            v-model="name"
                            v-bind="nameProps"
                            :placeholder="$t('name')"
                        />
                    </UFormGroup>
                    <UFormGroup name="email" :error="!!errors.email">
                        <UInput
                            color="gray"
                            data-testid="email-input"
                            variant="outline"
                            class="mt-2"
                            v-model="email"
                            v-bind="emailProps"
                            placeholder="E-mail"
                        />
                    </UFormGroup>
                    <UFormGroup name="password" :error="!!errors.password">
                        <GeneralInputPassword
                            data-testid="password-input"
                            v-model="password"
                            v-bind="passwordProps"
                            :placeholder="$t('password')"
                        />
                    </UFormGroup>
                    <UFormGroup name="confirmPass" :error="!!errors.confirmPass">
                        <GeneralInputPassword
                            data-testid="confirm-pass-input"
                            v-model="confirmPass"
                            v-bind="confirmPassProps"
                            :placeholder="$t('confirm-password')"
                        />
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
import { useForm, configure } from 'vee-validate'
import * as yup from 'yup'

definePageMeta({ middleware: ['guest'] })

configure({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
})

const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup
        .string()
        .min(6)
        .required()
        .oneOf([yup.ref('confirmPass'), null], 'passwords must match'),
    confirmPass: yup
        .string()
        .min(6)
        .required()
        .oneOf([yup.ref('password'), null], 'passwords must match'),
})
const { defineField, values, errors, validate } = useForm({
    validationSchema,
})
const [name, nameProps] = defineField('name')
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
const [confirmPass, confirmPassProps] = defineField('confirmPass')

const { signUp } = useAuthenticationStore()

const submitSignUp = async () => {
    const validationErrors = await validate()
    if (!validationErrors.valid) return
    signUp({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
    })
}

onUnmounted(() => {
    configure({
        validateOnBlur: true,
        validateOnChange: false,
        validateOnModelUpdate: false,
    })
})
</script>
