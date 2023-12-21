<template>
    <div class="px-5 md:flex md:justify-center md:items-center h-full" data-testid="signin-wrapper">
        <div class="w-full md:w-[300px]">
            <span v-if="!isLoadingAuthentication" class="font-semibold">{{ $t('sign-in') }}</span>
            <USkeleton v-else class="h-[20px] w-[50px]" />
            <UForm :state="values" @submit="submitSignIn">
                <UCard class="mt-4 w-full" v-if="!isLoadingAuthentication">
                    <UFormGroup name="email" :error="!!errors.email">
                        <UInput
                            data-testid="email-input"
                            color="gray"
                            variant="outline"
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
                </UCard>
                <USkeleton v-else class="mt-4 h-[110px] w-[100%]" />
                <div class="column mt-3" v-if="!isLoadingAuthentication">
                    <UButton
                        block
                        data-testid="signin-submit"
                        type="submit"
                        :label="$t('sign-in')"
                        :title="$t('sign-in')"
                        color="primary"
                        :ui="{ rounded: 'rounded-xl' }"
                    />
                    <UButton
                        class="mt-3"
                        block
                        variant="solid"
                        :label="$t('create-account')"
                        :title="$t('create-account')"
                        to="/signup"
                        color="white"
                        :ui="{ rounded: 'rounded-xl' }"
                    />
                </div>
                <div class="mt-3" v-else>
                    <USkeleton class="h-9 w-[100%]" />
                    <USkeleton class="h-9 mt-3 w-[100%]" />
                </div>
            </UForm>
        </div>
    </div>
</template>

<script setup>
import { useForm, configure } from 'vee-validate'
import * as yup from 'yup'

configure({
    validateOnBlur: true,
    validateOnChange: false,
    validateOnModelUpdate: false,
})

definePageMeta({ middleware: ['guest'] })

const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().min(6).required(),
})
const { defineField, values, errors, validate } = useForm({
    validationSchema,
})
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const { signIn } = useAuthenticationStore()
const { isLoadingAuthentication } = storeToRefs(useAuthenticationStore())

const submitSignIn = async () => {
    const validationErrors = await validate()
    if (!validationErrors.valid) return
    signIn({
        email: values.email,
        password: values.password,
    })
}
</script>
