<template>
  <div class="px-5 md:flex md:justify-center md:items-center h-full">
    <div class="w-full md:w-[300px]">
      <span v-if="!isLoadingLogin" class="font-semibold">{{ $t('sign-in') }}</span>
      <USkeleton v-else class="h-[20px] w-[50px]" />
      <UForm :state="values" @submit="signIn">
        <UCard class="mt-4 w-full" v-if="!isLoadingLogin">
          <UFormGroup name="email" :error="!!errors.email">
            <UInput color="gray" variant="outline" v-bind="email"
              placeholder="E-mail" />
          </UFormGroup>
          <UFormGroup name="password" :error="!!errors.password">
            <GeneralInputPassword
              v-bind="password"
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
  import { useForm } from 'vee-validate';
  import * as yup from 'yup';
  import { ref } from 'vue';
  const isLoadingLogin = ref(false)
  const router = useRouter();
  const validationSchema = yup.object({ 
    email: yup.string().required().email(),
    password: yup.string().min(6).required()
   });
  const { defineInputBinds, values, errors, validate } = useForm({ 
    validationSchema
  });
  const email = defineInputBinds('email');
  const password = defineInputBinds('password');

  const signIn = async () => {
    try {
      const validationErrors = await validate();
      if (!validationErrors.valid) return
      isLoadingLogin.value = true
      const { data } = await authenticationService.signIn({ 
        email: values.email, 
        password: values.password 
      });
      router.push('/dashboard');
    } catch (error) {
      useToastError('Não foi possivel fazer login.')
    } finally {
      isLoadingLogin.value = false
    }
  };
</script>