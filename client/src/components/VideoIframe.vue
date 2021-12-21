<template>
  <div
    id="wrapper"
    class="card shadow d-flex justify-content-center align-items-center h-100 w-100"
  >
    <div v-if="isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <h4 v-if="!video && !isLoading" class="fw-bold">在 {{ platform }} 這部影片還沒上架：（</h4>
    <iframe v-if="video" :src="video.embedUrl" allowfullscreen class="h-100 w-100 rounded"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    video: null,
    isLoading: Boolean,
    platform: String,
  },
};
</script>

<style scoped>
iframe,
#wrapper {
  min-height: 256px;
}
</style>
