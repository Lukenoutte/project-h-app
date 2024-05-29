<template>
    <div class="h-16 flex items-center px-5 justify-between">
        <NuxtLink :to="shouldDisableOnHeader ? null : '/'" :disabled="true" v-if="!isLoadingGlobal">
            <div class="flex items-center">
                <UIcon class="text-3xl text-primary cursor-pointer mr-2" name="i-heroicons-fire-solid" />
                <strong class="text-primary" v-if="!hasDataOfCurrentStore">Vendur</strong>
                <strong class="text-primary" v-else> {{ currentStore.name }} </strong>
            </div>
        </NuxtLink>
        <div v-else>
            <USkeleton class="h-8 w-[100px] lg:w-[150px]" />
        </div>
        <div class="flex items-center hidden lg:flex" v-if="!isLoadingGlobal">
            <USelectMenu
                class="mr-4 w-[110px]"
                value-attribute="id"
                v-model="locale"
                :options="localesList"
                data-testid="locale-select"
            >
                <template #label>
                    <UIcon :name="currentLocale.icon" class="w-4 h-4" />
                    {{ currentLocale.label }}
                </template>
            </USelectMenu>
            <UButton
                class="mr-4"
                data-testid="dark-mode"
                color="white"
                :ui="{ rounded: 'rounded-xl' }"
                :title="$t('dark-mode')"
                :icon="isDarkMode ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'"
                @click="setColorTheme(isDarkMode ? 'light' : 'dark')"
            />
            <UButton
                v-if="!isAuthenticated"
                to="/signin"
                data-testid="sign-in"
                :label="$t('sign-in')"
                :title="$t('sign-in')"
                class="px-7 py-2"
                color="white"
                :ui="{ rounded: 'rounded-xl' }"
            />
            <UDropdown
                v-else
                data-testid="user-menu"
                :items="itemsDropDownProfile"
                :popper="{ placement: 'bottom-start' }"
            >
                <UButton
                    color="white"
                    icon="i-heroicons-user-solid"
                    :ui="{ rounded: 'rounded-xl' }"
                    trailing-icon="i-heroicons-chevron-down-20-solid"
                />
                <template #account="{ item }">
                    <div class="text-left">
                        <p>{{ $t('signed-in-as') }}</p>
                        <p class="truncate font-medium text-gray-900 dark:text-white">
                            {{ item.label }}
                        </p>
                    </div>
                </template>
            </UDropdown>
        </div>
        <div v-else>
            <USkeleton class="h-8 w-[80px] lg:w-[300px]" />
        </div>
        <div class="block lg:hidden" v-if="!isLoadingGlobal">
            <UButton
                :padded="false"
                color="black"
                variant="link"
                icon="i-heroicons-bars-3"
                :ui="{ icon: { size: { xl: 'h-8 w-8' } } }"
                size="lg"
                @click="setMenuMobileState(!mobileMenuIsOpen)"
            />
        </div>
    </div>
</template>

<script setup>
const { locale, t: translate } = useI18n()
const localesList = [
    { id: 'pt-br', label: 'PT-BR', icon: 'i-heroicons-fire-solid' },
    { id: 'en', label: 'EN', icon: 'i-heroicons-fire-solid' },
]
const currentLocale = computed(() => localesList.find((current) => current.id === locale.value))
const setColorTheme = (newTheme) => {
    useColorMode().preference = newTheme
}

const { isLoadingGlobal } = storeToRefs(useGlobalStore())

const isDarkMode = computed(() => {
    const colorMode = useColorMode().preference
    return colorMode === 'dark'
})

const { mobileMenuIsOpen } = storeToRefs(useGlobalStore())
const { setMenuMobileState } = useGlobalStore()

const { signOut } = useAuthenticationStore()
const { isAuthenticated } = storeToRefs(useAuthenticationStore())

const profileLabel = computed(() => translate('profile'))
const settingsLabel = computed(() => translate('settings'))
const signOutLabel = computed(() => translate('sign-out'))
const router = useRouter()

const { currentUser } = storeToRefs(useUserStore())
const shouldDisableOnHeader = computed(() => {
    const { currentRoute } = router
    const { path } = currentRoute.value
    return path === '/signup/store'
})

const itemsDropDownProfile = computed(() => [
    [
        {
            label: currentUser.value?.email,
            slot: 'account',
            disabled: true,
        },
    ],
    [
        {
            label: profileLabel.value,
            avatar: {
                src: 'https://avatars.githubusercontent.com/u/739984?v=4',
            },
            disabled: shouldDisableOnHeader.value,
        },

        {
            label: settingsLabel.value,
            icon: 'i-heroicons-cog-8-tooth',
            disabled: shouldDisableOnHeader.value,
        },
    ],
    [
        {
            label: signOutLabel.value,
            icon: 'i-heroicons-arrow-left-on-rectangle',
            click: () => {
                signOut()
            },
        },
    ],
])

const { currentStore, hasDataOfCurrentStore } = storeToRefs(useStoresStore())
</script>

<style></style>
