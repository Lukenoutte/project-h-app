<template>
  <div class="px-5 md:flex md:justify-center md:items-center h-full">
    <div class="w-full md:w-[500px]">
      <span class="font-semibold">{{ $t('sign-up') }}</span>
      <UForm :state="accountState" @submit="signUp">
        <UCard class="mt-4 w-full">
            <UFormGroup name="name" :error="shouldShowErrorOnField('name')">
              <UInput color="gray" 
                variant="outline" 
                v-model="accountState.name"
                :placeholder="$t('name')" />
            </UFormGroup>
            <UFormGroup name="email" :error="shouldShowErrorOnField('email')">
              <UInput color="gray"
                variant="outline" class="mt-2" 
                v-model="accountState.email"
                placeholder="E-mail" />
            </UFormGroup>
            <UFormGroup name="password" 
              :error="shouldShowErrorOnField('password')">
              <GeneralInputPassword
                v-model="accountState.password"
                :placeholder="$t('password')" />
            </UFormGroup>
            <UFormGroup name="comfirmPass" 
              :error="shouldShowErrorOnField('comfirmPass')">
              <GeneralInputPassword
                v-model="accountState.comfirmPass"
                :placeholder="$t('comfirm-password')" />
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
          <UButton class="mt-3 px-7 py-2" :label="$t('finish')" 
            :title="$t('finish')" type="submit"
            color="primary" :ui="{ rounded: 'rounded-xl' }"/>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup>
  import authenticationService from '~/services/authenticationSevice';
  import { ref, reactive } from 'vue';
  const accountState= reactive({
    name: '',
    email: '',
    password: '',
    comfirmPass: ''
  })
  const isLoadingSignUp = ref(false)
  const errorEmptyField = ref(false)
  const errorDifferentPasswords = ref(false)
  const router = useRouter();

  const signUp = async () => {
    try {
      isLoadingSignUp.value = true
      if (!isValidSignUpForm()) return
      const { data } = await authenticationService.signUp({
        name: accountState.name,
        email: accountState.email, 
        password: accountState.password,
      });
      router.push('/signin');
    } catch (error) {
      useToastError('Não foi possivel criar uma conta.')
    } finally {
      isLoadingSignUp.value = false
    }
  };

  const isValidSignUpForm = () => {
    const { name, email, password, comfirmPass } = accountState
    if (!name || !email || !password || !comfirmPass) {
      errorEmptyField.value = true
      return 
    }
    if (password !== comfirmPass) {
      errorDifferentPasswords.value = true
      return
    }
    errorDifferentPasswords.value = false
    errorEmptyField.value = false
    return true
  }

  const shouldShowErrorOnField = (field) => {
    if (!accountState[field] && errorEmptyField.value) return true
    const passFields= field === 'password' || field === 'comfirmPass'
    if (passFields && errorDifferentPasswords.value) return true
    return false
  }
</script>
