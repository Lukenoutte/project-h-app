<template>
    <UCard>
        <strong>Bem vindo(a)!</strong>
        <p class="mt-1">O próximo passo é criar sua loja:</p>
        <UForm :state="values" @submit="submitSignUpStore">
            <div class="row mt-4">
                <UInput color="gray" variant="outline" v-bind="nameProps" v-model="name" placeholder="Nome" />
                <UInput
                    class="mt-2"
                    color="gray"
                    variant="outline"
                    v-bind="categoryProps"
                    v-model="category"
                    placeholder="Categoria"
                />
                <UInput
                    class="mt-2"
                    color="gray"
                    variant="outline"
                    v-bind="subdomainProps"
                    v-model="subdomain"
                    placeholder="Subdomínio"
                />
            </div>
            <div class="mt-4">
                <UButton
                    block
                    type="submit"
                    label="Criar"
                    title="Criar"
                    color="primary"
                    :ui="{ rounded: 'rounded-xl' }"
                />
            </div>
        </UForm>
    </UCard>
</template>

<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
definePageMeta({ layout: 'dashboard', middleware: ['authentication'] })
const { executeRefeshTokenBeforeExpire } = useAuthenticationStore()
const { showUser } = useUserStore()
const { currentUser } = storeToRefs(useUserStore())
const router = useRouter()

const validationSchema = yup.object({
    name: yup.string().required(),
    category: yup.string().required(),
    subdomain: yup.string().required(),
})

const { defineField, values, errors, validate } = useForm({
    validationSchema,
})

const [name, nameProps] = defineField('name')
const [category, categoryProps] = defineField('category')
const [subdomain, subdomainProps] = defineField('subdomain')

const { signUpStore } = useStoresStore()

const submitSignUpStore = async () => {
    const validationErrors = await validate()
    if (!validationErrors.valid) return
    await signUpStore({
        name: values.name,
        category: values.category,
        subdomain: values.subdomain,
    })
    await showUser()
    router.push('/')
}

onMounted(async () => {
    const accessTokenExpireAt = useCookie('accessTokenExpireAt')
    if (accessTokenExpireAt.value) executeRefeshTokenBeforeExpire()
    await showUser()
    if (!currentUser.value.storeId) router.push('/signup/store')
})
</script>
