# APIs

## params

- All  listing endpoints of wiwivideo accpet the params as below:

``` js
{
  start: Number,
  count: Number
}
```

- All  listing endpoints of odysee accpet the params as below:

``` js
{
  page: Number,
  count: Number
}
```

- All  listing endpoints of youtube do not accept pagination params.
  `nextPageToken` is included in the res indicates there are another page.
  The next page can be accessed by sending request with the `nextPageToken`.

## /videos

```js
{
  total: Number,
  videos: [
    {
      id: Number,
      title: String,
      thumbnailUrl: String,
      publishedAt: Date,
    }
  ]
}
```

## /videos/wiwivideo/:videoId

```js
{
  videoId: Number,
  title: String,
  description: String,
  embedUrl: String,
  publishedAt: Date,
}
```

## /videos/odysee/:title

```js
{
  claimId: String,
  title: String,
  link: String, 
  thumbnailUrl: String,
  publishedAt: String,
}
```

## /videos/youtube/:title

```js
{
  videoId: String,
  title: String,
  link: String, 
  thumbnailUrl: String,
  publishedAt: String,
}
```

## /comments/wiwivideo/:videoId

```js
{
  total: Number,
  comments: [
    commentId: Number,
    text: String,
    replies: Number,
    createdAt: Date,
    author: {
      name: String,
      avatarUrl: String 
    }
  ]
}
```

## /replies/wiwivideo/:parentId

//TODO: comfirm if it works

```js
{
  total: Number,
  comments: [
    commentId: Number,
    text: String,
    replies: Number,
    createdAt: Date,
    author: {
      name: String,
      avatarUrl: String 
    }
  ]
}
```

## /comments/odysee/:videoId

//TODO: get author thumbnail

```js
{
  total: Number,
  comments: [
    commentId: Number,
    text: String,
    replies: Number,
    createdAt: Date,
    author: {
      name: String,
      avatarUrl: String 
    }
  ]
}
```

## /replies/odysee/:parentId

```js
{
  total: Number,
  comments: [
    commentId: Number,
    text: String,
    replies: Number,
    createdAt: Date,
    author: {
      name: String,
      avatarUrl: String 
    }
  ]
}
```

## /comments/youtube/:videoId

```js
{
  total: Number,
  nextPageToken: String | undefined,
  comments: [
    commentId: Number,
    text: String,
    replies: Number,
    createdAt: Date,
    author: {
      name: String,
      avatarUrl: String 
    }
  ]
}
```

## /replies/youtube/:parentId

```js
{
  total: Number,
  nextPageToken: String | undefined,
  comments: [
    commentId: Number,
    text: String,
    replies: Number,
    createdAt: Date,
    author: {
      name: String,
      avatarUrl: String 
    }
  ]
}
```