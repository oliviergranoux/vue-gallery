<template>
  <AlbumsList />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AlbumsList from '@/components/AlbumsList.vue';

@Options({
  components: {
    AlbumsList
  }
})
export default class Home extends Vue {
  created() {
    const titleEl = document.querySelector('head title');
    if (titleEl != null) {
      titleEl.textContent = process.env.VUE_APP_TITLE;
    }
  }
}
</script>
