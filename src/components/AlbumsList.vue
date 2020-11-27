<template>
  <section id="albums">
    <div v-if="errored">
      <p>Nous sommes désolés, nous ne sommes pas en mesure de récupérer la liste des albums. Veuillez réessayer ultérieurement.</p>
    </div>

    <div v-if="loading">Chargement...</div>

    <div v-if="albums" class="content">
      <AlbumsListItem v-for="album in albums" 
        :key="album.id" 
        :album="album"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Album } from "@/types/Album";
import AlbumService from "@/services/AlbumService";
import AlbumsListItem from "@/components/AlbumsListItem.vue";

@Options({
  components: {
    AlbumsListItem
  }
})
export default class AlbumsList extends Vue {
  //properties
  albums!: [Album];
  loading!: boolean;
  errored!: boolean;

  data() {
    return {
      albums: null,
      loading: true,
      errored: false
    };
  }

  mounted() {
    AlbumService.listAlbums()
      .then(response => {
        this.albums = response;
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
section#albums div.content {
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
