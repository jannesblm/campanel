<script setup>
import { onMounted, watch, ref } from 'vue';
import { useImageStore } from './stores/image';
const imageStore = useImageStore();
const myCanvas = ref(null);

watch(() => imageStore.image, (first, second) => {

  //for (var i=0; i<length; i++) {
  //    second[(length-1)-i] = second[i];
  //}
  //for (let i = 0; i < second.length - 3; i += 3) {
  //  second[i], second[i + 2] = second[i + 2], second[i];
  //}  

  console.log(second);

  const ctx = myCanvas.value.getContext("2d");
  var imageData = ctx.createImageData(288, 512, { colorSpace: "srgb" });
  const array = Uint8ClampedArray.from(second);
  //console.log(array);
  imageData.data.set(array);
  ctx.putImageData(imageData, 0, 0);
  console.log(1)
})
</script>

<template>
  <canvas ref="myCanvas"></canvas>

  <!-- <RouterView /> -->
</template>

<style scoped>

</style>
