<template>
  <AlbumDetail />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AlbumDetail from "@/components/AlbumDetail.vue";

@Options({
  components: {
    AlbumDetail
  }
})
export default class Album extends Vue {}
</script>
