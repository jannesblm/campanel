<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    data: Uint8Array
})

const canvas = ref(null)

onMounted(() => {
    fill(props.data)
})

watch(() => props.data, (data) => {
   fill(data)
});

function fill(data) {
    const ctx = canvas.value.getContext("2d")
    var imageData = ctx.createImageData(512, 288, { colorSpace: "srgb" })
    const array = Uint8ClampedArray.from(data)
    imageData.data.set(array)

    ctx.putImageData(imageData, 0, 0);
}
</script>

<template>
    <canvas :ref="el => canvas = el"></canvas>
</template>
