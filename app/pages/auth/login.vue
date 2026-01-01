<script setup lang="ts">
definePageMeta({
    layout: false,
});
</script>

<template>
    <div class="bg-background min-h-screen w-full flex justify-center">
        <div class="w-full max-w-7xl mx-auto text-black">
            <div
                class="grid grid-cols-1 md:grid-cols-2 items-center min-h-screen py-24"
            >
                <!-- Login -->
                <div
                    class="px-8 w-full h-full flex flex-col items-start justify-between"
                >
                    <div
                        class="flex flex-col justify-center h-full w-full gap-12"
                    >
                        <span class="font-medium text-lg"> Lokana </span>
                        <h1 class="font-medium">
                            <span class="text-3xl block">
                                Selamat Datang,
                            </span>
                            <span class="text-[#FF0000] text-4xl">
                                Sahabat Museum!
                            </span>
                        </h1>
                    </div>
                    <div class="h-full flex flex-col justify-center w-full">
                        <UForm class="space-y-6 w-full max-w-112.5">
                            <UFormField name="email">
                                <UInput
                                    class="w-112.5"
                                    placeholder="email"
                                    :ui="{
                                        base: 'ring-[1.5px] ring-red-600 bg-background text-black p-3 rounded-xl placeholder:text-secondary',
                                    }"
                                />
                            </UFormField>

                            <UFormField name="password">
                                <UInput
                                    class="w-112.5"
                                    placeholder="kata sandi"
                                    :ui="{
                                        base: 'ring-[1.5px] ring-red-600 bg-background text-black p-3 rounded-xl placeholder:text-secondary',
                                    }"
                                />
                            </UFormField>

                            <div class="flex w-full justify-between px-1">
                                <div>
                                    <UCheckbox
                                        label="Ingat Saya"
                                        color="warning"
                                        :ui="{
                                            label: 'font-normal text-secondary',
                                        }"
                                    />
                                </div>
                                <div>
                                    <NuxtLink
                                        to="/auth/register"
                                        class="font-normal text-secondary"
                                        >Lupa Kata Sandi?</NuxtLink
                                    >
                                </div>
                            </div>

                            <UButton
                                type="submit"
                                class="py-3 px-6 text-white bg-[#FF0000] rounded-xl hover:text-black hover:bg-white cursor-pointer"
                            >
                                Masuk
                            </UButton>
                        </UForm>
                    </div>
                    <div
                        class="h-full w-full flex justify-start items-center font-bold text-base gap-2"
                    >
                        <span class="text-secondary"> Belum punya akun? </span>
                        <NuxtLink to="/auth/register" class="text-[#FF0000]">
                            Daftar
                        </NuxtLink>
                    </div>
                </div>

                <!-- Image -->
                <div class="w-full h-full flex items-center justify-center">
                    <NuxtImg
                        src="/images/batik.jpg"
                        alt="Login Image"
                        class="w-full h-full object-cover rounded-3xl"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
