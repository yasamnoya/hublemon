<template>
  <div>
    <div id="banner" class="d-flex">
      <div
        class="container d-flex flex-column justify-content-center align-items-center text-center"
      >
        <h1>Hub 檸檬</h1>
        <p class="lead">一次看完好檸檬在 Wiwi.video | Odysee | Youtube 的留言！</p>
      </div>
    </div>

    <div id="body" class="bg-light py-5">
      <div class="container">
        <h3 v-if="videos.length == 0 && !isFetchingVideos">嗚嗚，好像出錯了：（</h3>
        <video-card v-for="video of videos.videos" :key="video.videoId" :video="video"></video-card>

        <div class="d-flex justify-content-center">
          <button
            v-if="videos.length != 0 && videos.videos.length < videos.total && !isFetchingVideos"
            @click="loadMore"
            class="btn btn-outline-dark w-100"
          >
            <h4>▾ 更多</h4>
          </button>
          <div v-if="isFetchingVideos" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VideoCard from '../components/VideoCard.vue';

export default {
  name: 'Home',
  components: {
    VideoCard,
  },
  data: () => ({
    videos: [],
    isFetchingVideos: false,
  }),
  async created() {
    try {
      this.isFetchingVideos = true;
      const res = await axios.get('/wiwivideo/videos');
      this.videos = res.data;
    } catch (e) {
      console.warn(e);
    }
    this.isFetchingVideos = false;
  },
  methods: {
    async loadMore() {
      try {
        this.isFetchingVideos = true;
        const res = await axios.get('/wiwivideo/videos', {
          params: { start: this.videos.videos.length },
        });
        this.videos.videos = this.videos.videos.concat(res.data.videos);
      } catch (e) {
        console.warn(e);
      }
      this.isFetchingVideos = false;
    },
  },
};
</script>

<style scoped>
#banner {
  width: 100vw;
  height: 500px;
  max-height: 70vw;
  /* background-color: lemonchiffon; */
}

h1 {
  font-size: 4rem;
  font-weight: 900;
  line-height: 2;
}
</style>
