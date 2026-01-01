<template>
    <div
        class="border border-gray-300 min-h-80 p-4 flex flex-col justify-between rounded-xl"
    >
        <div class="flex items-center justify-between h-full gap-4">
            <img
                src="https://picsum.photos/200"
                alt="Gambar"
                class="w-22 h-25 rounded-lg"
            />
            <div class="h-full flex flex-col justify-center items-start">
                <span>Gamelan</span>
                <div class="flex gap-2">
                    <UBadge class="bg-[#FF0000] text-white">Badge</UBadge>
                    <UBadge class="bg-[#E0DDD5] text-secondary"
                        >Majapahit (Abad 14)</UBadge
                    >
                </div>
            </div>
        </div>
        <div class="h-full flex items-center">
            <p class="text-xs">
                Seperangkat instrumen musik perunggu yang digunakan dalam
                upacara kerajaan dan pertunjukan wayang.
            </p>
        </div>
        <div class="flex flex-col h-full gap-4">
            <div class="bg-[#E0DDD5] p-2 flex gap-4 rounded-lg">
                <img
                    src="https://picsum.photos/200"
                    alt="Gambar"
                    class="w-10 rounded-lg"
                />
                <div class="flex flex-col">
                    <span> Museum </span>
                    <span> DIY </span>
                </div>
            </div>
            <UButton label="button" />
        </div>
    </div>
</template>
