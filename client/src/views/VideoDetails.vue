<template>
  <div id="body" class="bg-light py-5">
    <div v-if="video.wiwivideo">
      <div id="videoGrid" class="container g-3 mb-3 mb-md-5">
        <div class="row h-100">
          <div class="col-lg-8 col-12 mb-1 mb-lg-0">
            <video-iframe
              :video="video.wiwivideo"
              :isLoading="isLoading.video.wiwivideo"
              platform="wiwi.video"
            ></video-iframe>
          </div>
          <div class="col-lg-4 col-12 container">
            <div class="row h-100">
              <div class="col-12 h-lg-50">
                <video-iframe
                  :video="video.odysee"
                  :isLoading="isLoading.video.odysee"
                  platform="Odysee"
                ></video-iframe>
              </div>
              <div class="col-12 h-lg-50">
                <video-iframe
                  :video="video.youtube"
                  :isLoading="isLoading.video.youtube"
                  platform="Youtube"
                ></video-iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="videoInfo" class="container">
        <h2 class="fw-bold">{{ video.wiwivideo.title }}</h2>
        <p>發佈於 {{ video.wiwivideo.publishedDateString }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import VideoIframe from '../components/VideoIframe.vue';

export default {
  components: {
    VideoIframe,
  },
  data: () => ({
    video: {
      wiwivideo: null,
      odysee: null,
      youtube: null,
    },
    isLoading: {
      video: {
        wiwivideo: true,
        odysee: true,
        youtube: true,
      },
    },
  }),
  async created() {
    await this.fetchWiwivideoVideo();
    this.video.wiwivideo.publishedDateString = this.generateTimeString(
      this.video.wiwivideo.publishedAt,
    );
    await Promise.all([this.fetchOdyseeVideo(), this.fetchYoutubeVideo()]);
  },
  methods: {
    async fetchWiwivideoVideo() {
      this.isLoading.video.wiwivideo = true;
      try {
        const res = await axios.get(`/wiwivideo/videos/${this.$route.params.videoId}`);
        this.video.wiwivideo = res.data;
      } catch (e) {
        console.warn(e);
      }
      this.isLoading.video.wiwivideo = false;
    },
    async fetchOdyseeVideo() {
      this.isLoading.video.odysee = true;
      try {
        const res = await axios.get(`/odysee/videos/${this.video.wiwivideo.title}`);
        this.video.odysee = res.data;
      } catch (e) {
        console.warn(e);
      }
      this.isLoading.video.odysee = false;
    },
    async fetchYoutubeVideo() {
      this.isLoading.video.youtube = true;
      try {
        const res = await axios.get(`/youtube/videos/${this.video.wiwivideo.title}`);
        this.video.youtube = res.data;
      } catch (e) {
        console.warn(e);
      }
      this.isLoading.video.youtube = false;
    },
    generateTimeString(date) {
      return moment(date).format('YYYY 年 MM 月 DD 日');
    },
  },
};
</script>

<style scoped>
#body {
  min-height: 100vh;
}

iframe {
  min-height: 256px;
}

@media (min-width: 768px) {
  #videoGrid {
    height: 512px;
  }
}
</style>
