# APIs

## wiwivideo

### params

- All  listing endpoints of wiwivideo accpet the params as below:

``` js
{
  start: Number,
  count: Number
}
```

### /wiwivideo/videos

```js
{
  total:Number,
  videos: [{
    vidoeId: Number,
    title: String,
    thumbailUrl: String,
    publishedAt: Date,
  }]
}
```

### /wiwivideo/videos/:videoId

```js
{
  videoId: Number,
  title: String,
  description: String,
  embedUrl: String,
  publishAt: String,
}
```

### /wiwivideo/videos/:videoId/comments

```js
{
  total: Number,
  comments: [{
    commentId: Number,
    text: String,
    createdAt: Date,
    replies: Number,
    author: {
      name: String,
      avatarUrl: String | null,
    }
  }]
}
```

### /wiwivideo/videos/:videoId/comments/:commentId/replies

```js
{
  total: Number,
  replies: [{
    commentId: Number,
    text: String,
    replies: Number,
    createdAt: Date,
    author: {
      name: String,
      avatarUrl: String | null,
    },
    children: [{ comment }]
  }]
}
```

## odysee

### params

- All  listing endpoints of odysee accpet the params as below:

``` js
{
  page: Number,
  pageSize: Number
}
```

### /odysee/videos/:videoTitle

```js
{
  claimId: String,
  title: String,
  embedUrl: String,
  publishedAt: Date,
}
```

### /odysee/videos/claimId/comments

```js
{
  total: Number,
  comments: {
    commentId: String,
    text: String,
    createdAt: Date,
    replies: Number,
    author: {
      name: String,
      avatarUrl: String | null,
    }
  }
}
```

### /odysee/videos/claimId/comments/:commentId

```js
{
  total: Number,
  comments: {
    commentId: String,
    text: String,
    createdAt: Date,
    replies: Number,
    author: {
      name: String,
      avatarUrl: String | null,
    }
  }
}
```

## Youtube

### params

- All  listing endpoints of youtube do not accept pagination params.
  `nextPageToken` is included in the res indicates there are another page.
  The next page can be accessed by sending request with the param `pageToken`.

### /youtube/videos/:videoTitle

```js
{
  videoId: String,
  title: String,
  description: String,
  embedUrl: String
  publishedAt: Date,
}
```

### /youtube/videos/:videoId/comments

```js
{
  nextPageToken: String,
  {
    commentId: String,
    text: String,
    createdAt: Date,
    replies: Number,
    author: {
      name: String,
      avatarUrl: String,
    },
  }
}
```

### /youtube/videos/:videoId/comments/:commentId/replies

```js
{
  nextPageToken: String,
  commentId: String,
  text: String,
  createdAt: Date,
  author: {
    name: String,
    avatarUrl: String,
  },
}
```
