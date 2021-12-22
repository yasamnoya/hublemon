<template>
  <div>
    <div class="card my-2 shadow">
      <div class="card-body">
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
          <p class="text-muted">{{ comment.createdDateString }}</p>
        </div>
        <p>{{ comment.text }}</p>
      </div>
    </div>
    <div v-if="comment.replies > 0" class="d-flex">
      <div class="spacer"></div>
      <button class="btn fw-bold">▾ {{ comment.replies }} 個回覆</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    comment: {},
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
  },
};
</script>

<style scoped>
.spacer {
  width: 32px;
}
</style>
