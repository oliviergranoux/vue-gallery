<template>
  <div v-if="isValidAlbum">
    <router-link :to="url">
      <figure>
        <picture><img :src="imageSourceByWitdh(500)"/></picture>
        <figcaption v-if="hasCaption">{{ album.caption }}</figcaption>
      </figure>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Album } from "@/types/Album";

@Options({
  props: {
    album: {} as Album
  }
})
export default class AlbumsListItem extends Vue {
  //properties
  album!: Album;

  //computed properties
  get isValidAlbum() {
    return this.album && this.album.folder && this.album.images.length > 0;
  }

  get hasCaption() {
    return this.album.caption && true;
  }

  get url() {
    return "/album/" + this.album.folder;
  }

  imageSourceByWitdh(width: number) {
    const image = this.album.images[0];
    const extension = (image.extension === undefined) ? ".jpg" :  image.extension;

    return "assets/images/albums/" + this.album.folder + "/" + image.filename + "-" + width + "w" + extension;
  }
}
</script>

<style lang="scss" scoped>
div {
  flex: 1 1 auto;

  @include responsive-width-images();

  a {
    display: contents;
    text-decoration: none;

    figure {
      max-width: 100%;
      margin: .5rem;
      background: linear-gradient(20deg, $color-from 0%, $color-to 100%);
      box-shadow: 0 0 .5rem 0 $color-shadow-box;

      line-height: 0;

      &:hover {
        transform: scale(1.01);
      }

      img {
        width: 100%;
        max-height: 10em;
        object-fit: cover;
      }

      figcaption {
        font-size: 1.2rem;
        text-align: center;
        font-variant: small-caps;
        color: $color-text-dark;
        padding: .8rem 1rem 1rem 1rem;
        line-height: 1.5;
      }
    }
  }
}
</style>
