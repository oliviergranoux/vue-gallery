<template>
  <section id="album">
    <div v-if="errored">
      <p>
        Nous sommes désolés, nous ne sommes pas en mesure de récupérer la liste des images de l'album. Veuillez réessayer ultérieurement.
      </p>
    </div>

    <div v-if="loading">
      Chargement ...
    </div>

    <div v-if="album" class="content">
      <AlbumDetailItem v-for="(image, index) in album.images"
        :key="`image-${index}`"
        :folder="album.folder"
        :image="image"
        :index="index"
        :is-last="index == Object.keys(album.images).length - 1"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Album } from "@/types/Album";
import AlbumService from "@/services/AlbumService";
import AlbumDetailItem from "@/components/AlbumDetailItem.vue";

@Options({
  components: {
    AlbumDetailItem
  }
})
export default class AlbumDetail extends Vue {
  //properties
  album!: Album;
  loading!: boolean;
  errored!: boolean;

  data() {
    return {
      album: null,
      loading: true,
      errored: false
    };
  }

  mounted() {
    AlbumService.listAlbums()
      .then(response => {       
        this.album = response.find((elt: Album) => elt.folder === this.$route.params.folder);
        if (!this.album) {
          this.$router.push("/404");
        }
        else{
          const titleEl = document.querySelector("head title");
          if (titleEl != null) {
            titleEl.textContent = process.env.VUE_APP_TITLE + " - " + this.album.caption;
          }
        }
      })
      .catch(error => {
        this.errored = true;
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
div.content {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;

  @include responsive($device-landscape-phone) {
    flex-direction: row;
  }    
}
</style>