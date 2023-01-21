<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    data: Uint8Array,
})

const canvas = ref(null)

watch(() => props.data, (data) => {
    console.log(data)
    const ctx = canvas.value.getContext("2d")
    var imageData = ctx.createImageData(512, 288, { colorSpace: "srgb" })
    const array = Uint8ClampedArray.from(data)
    imageData.data.set(array)

    ctx.putImageData(imageData, 0, 0);
});
</script>

<template>
    <canvas ref="canvas"></canvas>
</template>