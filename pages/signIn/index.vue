<template>
  <div class="px-5 md:flex md:justify-center md:items-center h-full">
    <div class="w-full md:w-[300px]">
      <span class="font-semibold">{{ $t('sign-in') }}</span>
      <UForm :state="loginState" @submit="signIn">
        <UCard class="mt-4 w-full">
          <UFormGroup name="email" :error="!loginState.email && errorOnSubmmit">
            <UInput color="gray" variant="outline" v-model="loginState.email"
              placeholder="E-mail" />
          </UFormGroup>
          <UFormGroup name="password" :error="!loginState.password && errorOnSubmmit">
            <UInput color="gray" variant="outline" class="mt-2" 
              v-model="loginState.password"
              :placeholder="$t('password')" type="password" />
          </UFormGroup>
        </UCard>
        <div class="flex justify-end">
          <UButton class="mt-3 px-7 py-2"
            :loading="isLoadingLogin"
            :disabled="isLoadingLogin"
            type="submit"
            :label="!isLoadingLogin ? 'Enter' : ''"
            color="primary" :ui="{ rounded: 'rounded-xl' }"/>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup>
  import authenticationService from '~/services/authenticationSevice';
  import { ref, reactive } from 'vue';
  const toast = useToast()
  const loginState= reactive({
    email: '',
    password: ''
  })
  const isLoadingLogin = ref(false)
  const errorOnSubmmit = ref(false)
  const router = useRouter();

  const signIn = async () => {
    try {
      isLoadingLogin.value = true
      if (!isValidLoginForm()) return
      const { data } = await authenticationService.signIn({ 
        email: loginState.email, 
        password: loginState.password 
      });
      router.push('/dashboard');
    } catch (error) {
      toast.add({ 
        title: 'Não foi possivel fazer login.', 
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red'
       })
    } finally {
      isLoadingLogin.value = false
    }
  };

  const isValidLoginForm = () => {
    if (loginState.email && loginState.password ) return true
    errorOnSubmmit.value = true
  }
</script>