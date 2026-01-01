<script setup lang="ts">
import Card from "./ui/Card.vue";

const filter = ["Semua", "Artefak", "Arca", "Prasasti", "Koleksi"];
</script>

<template>
    <div class="flex flex-col gap-4 h-full">
        <!-- Title -->
        <div class="flex flex-col gap-4 shrink-0">
            <div class="flex flex-col gap-4">
                <h1 class="text-lg font-bold">
                    <span class="text-black"> Jelajahi </span>
                    <span class="text-[#FF0000]"> Peninggalan Budaya </span>
                </h1>
                <p>
                    Temukan artefak, arca, prasasti, dan koleksi bersejarah
                    Indonesia
                </p>
            </div>

            <div class="flex flex-col gap-4">
                <UDashboardSearchButton
                    class="w-full"
                    :kbds="['ctrl', 's']"
                    :ui="{ base: 'bg-background text-black' }"
                />
                <div class="grid grid-cols-3 gap-2">
                    <UButton v-for="item in filter" :key="item" class="mr-2">
                        {{ item }}
                    </UButton>
                </div>
            </div>
            <USeparator />
        </div>

        <!-- Content -->
        <div class="flex flex-col gap-4 flex-1 min-h-0">
            <div
                class="bg-[#E0DDD5] p-5 flex justify-between text-xs rounded-xl"
            >
                <h2 class="text-[#64748B]">
                    <span class="text-[#2C5F4F]">2</span> Peninggalan ditemukan
                </h2>
                <div class="text-[#64748B]">Semua Lokasi</div>
            </div>
            <div class="flex flex-col gap-4 overflow-y-auto pr-2">
                <Card />
                <Card />
            </div>
        </div>
    </div>
</template>
