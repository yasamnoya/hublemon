<template>
  <router-link :to="`/${video.videoId}`" class="card my-3">
    <div class="card-body container">
      <div class="row">
        <div class="col-md-4 mb-3 mb-md-0">
          <img :src="video.thumbnailUrl" :alt="`${video.title} 的縮圖`" class="w-100 rounded" />
        </div>
        <h3 class="card-title col-md-8 fw-bold">{{ video.title }}</h3>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    video: {},
  },
};
</script>

<style scoped>
.card {
  box-shadow: 1px 1px 3px grey;
  transition: all 0.1s;
}
.card:hover {
  box-shadow: 2px 2px 5px grey;
  transform: translate(0px, -2px);
}
</style>
