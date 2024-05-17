<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import playerLoader from '@brightcove/player-loader'

const props = defineProps({
  accountId: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  playerId: {
    type: String,
    required: true,
  },
})

const $video = ref<HTMLVideoElement>()

let observer: IntersectionObserver | null = null

onMounted(() => {
  playerLoader({
    refNode: $video.value,
    accountId: props.accountId,
    videoId: props.videoId,
    playerId: props.playerId,
    options: {
      preload: 'auto',
    },
  })
    .then((success) => {
      var myPlayer = success.ref
      myPlayer.ready(() => {
        observer = new IntersectionObserver(([entry]) => {
          if (entry.intersectionRatio > 0) {
            myPlayer.muted(true)
            // myPlayer.play()
          } else {
            myPlayer.pause()
          }
        })

        observer.observe($video.value!)
      })
    })
    .catch(function (error) {
      console.log('error', error)
    })
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div ref="$video" class="video-area"></div>
</template>
