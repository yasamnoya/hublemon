<template>
  <div>
    <div class="card my-2 shadow">
      <div class="card-body">
        <div class="d-flex flex-column flex-md-row">
          <div class="d-flex">
            <img
              width="32px"
              height="32px"
              :src="
                comment.author.avatarUrl ||
                'https://iconorbit.com/icons/256-watermark/0204201617425658313-Lemon%20Half%20Cut.jpg'
              "
              :alt="`Avatar of ${comment.author.name}`"
              class="rounded-circle me-3"
            />
            <h5 class="me-2 fw-bold">{{ comment.author.name }}</h5>
            <div class="me-3">
              <p v-if="comment.provider == 'wiwivideo'">
                <span class="badge bg-wiwivideo rounded-pill">wiwi.video</span>
              </p>
              <p v-if="comment.provider == 'odysee'">
                <span class="badge bg-odysee rounded-pill">Odysee</span>
              </p>
              <p v-if="comment.provider == 'youtube'">
                <span class="badge bg-youtube rounded-pill">Youtube</span>
              </p>
            </div>
          </div>
          <div class="d-flex">
            <p class="text-muted me-3">{{ comment.createdDateString }}</p>
          </div>
        </div>
        <p v-html="comment.text">{{ comment.text.trim() }}</p>
      </div>
    </div>
    <div v-if="comment.replies || comment.children.length > 0" class="d-flex w-100">
      <div class="spacer border-start border-2 border-secondary"></div>
      <button
        v-if="!comment.children.length"
        @click="fetchReplies(comment.commentId)"
        class="btn fw-bold"
      >
        ▾ {{ comment.replies }} 個回覆
        <span
          v-if="isFetchingReplies"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
      <div v-if="comment.children.length" class="w-100">
        <comment-card
          v-for="reply of comment.children"
          :key="reply.commentId"
          :video="video"
          :comment="reply"
        ></comment-card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'CommentCard',
  props: {
    comment: {},
    video: {},
  },
  data: () => ({
    isFetchingReplies: false,
  }),
  created() {
    this.comment.createdDateString = this.generateTimeString(this.comment.createdAt);
  },
  methods: {
    generateTimeString(date) {
      return moment(date).format('YYYY 年 MM 月 DD 日');
    },
    async fetchReplies(commentId) {
      let url = '';
      switch (this.comment.provider) {
        case 'wiwivideo':
          url = `/wiwivideo/videos/${this.video.wiwivideo.videoId}/comments/${commentId}/replies`;
          break;
        case 'odysee':
          url = `/odysee/videos/${this.video.odysee.claimId}/comments/${commentId}/replies`;
          break;
        case 'youtube':
          url = `/youtube/videos/${this.video.youtube.claimId}/comments/${commentId}/replies`;
          break;
        default:
          throw new Error();
      }

      this.isFetchingReplies = true;
      try {
        let children = [];
        const COUNT = 50;
        const res = await axios.get(url, {
          params: {
            count: COUNT,
          },
        });
        children = children.concat(res.data.replies);

        if (children.length === res.data.total) {
          this.comment.children = children;
          return;
        }

        const starts = [...Array(res.data.total).keys()].filter((n) => !(n % COUNT) && n > 0);
        await Promise.all(
          starts.map(async (start) => {
            const resInLoop = await axios.get(url, {
              params: {
                start,
                count: COUNT,
              },
            });
            children = children.concat(resInLoop.data.replies);
          }),
        );

        this.comment.children = this.comment.children.concat(children);
      } catch (e) {
        console.warn(e);
      }
      this.isFetchingReplies = false;
    },
  },
};
</script>

<style scoped>
.spacer {
  width: 32px;
}

.bg-wiwivideo {
  background-color: #f3690c;
}

.bg-odysee {
  background-color: #df0055;
}

.bg-youtube {
  background-color: #fe0001;
}
</style>
