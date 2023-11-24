<template>
  <div class="px-5 md:flex md:justify-center md:items-center h-full">
    <div class="w-full md:w-[300px]">
      <span v-if="!isLoadingLogin" class="font-semibold">{{ $t('sign-in') }}</span>
      <USkeleton v-else class="h-[20px] w-[50px]" />
      <UForm :state="loginState" @submit="signIn">
        <UCard class="mt-4 w-full" v-if="!isLoadingLogin">
          <UFormGroup name="email" :error="!loginState.email && errorOnSubmmit">
            <UInput color="gray" variant="outline" v-model="loginState.email"
              placeholder="E-mail" />
          </UFormGroup>
          <UFormGroup name="password" :error="!loginState.password && errorOnSubmmit">
            <GeneralInputPassword
              v-model="loginState.password"
              :placeholder="$t('password')" />
          </UFormGroup>
        </UCard>
        <USkeleton v-else class="mt-4 h-[110px] w-[100%]" />
        <div class="column mt-3" v-if="!isLoadingLogin">
          <UButton block
            type="submit"
            :label="$t('sign-in')"
            :title="$t('sign-in')"
            color="primary" :ui="{ rounded: 'rounded-xl' }"/>
          <UButton class="mt-3" block variant="solid"
            :label="$t('create-account')"
            :title="$t('create-account')"
            to="/signup"
            color="white" :ui="{ rounded: 'rounded-xl' }"/>
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
  import authenticationService from '~/services/authenticationSevice';
  import { ref, reactive } from 'vue';
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
      useToastError('Não foi possivel fazer login.')
    } finally {
      isLoadingLogin.value = false
    }
  };

  const isValidLoginForm = () => {
    if (loginState.email && loginState.password ) return true
    errorOnSubmmit.value = true
  }
</script>