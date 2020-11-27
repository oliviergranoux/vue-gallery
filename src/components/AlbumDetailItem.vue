<template>
  <div class="perfundo">
    <a class="perfundo__link" :href="ImageHref">
      <figure>
        <picture>
          <source media="(max-width: 767px)" :srcset="imageSourceByWitdh(500)">
          <source media="(min-width: 768px) and (max-width: 991px)" :srcset="imageSourceByWitdh(700)">
          <source media="(min-width: 992px) and (max-width: 1199px)" :srcset="imageSourceByWitdh(800)">
          <source media="(min-width: 1200px)" :srcset="imageSourceByWitdh(500)">
          <img :src="imageSourceByWitdh(500)" :alt="image.caption">
        </picture>
      </figure>
    </a>
    <div :id="imageId" class="perfundo__overlay fadeInLeft">
      <figure class="perfundo__content perfundo__figure">
         <picture>
          <source media="(max-width: 767px)" :srcset="imageSourceByWitdh(500)">
          <source media="(min-width: 768px) and (max-width: 991px)" :srcset="imageSourceByWitdh(700)">
          <source media="(min-width: 992px) and (max-width: 1199px)" :srcset="imageSourceByWitdh(800)">
          <source media="(min-width: 1200px)" :srcset="imageSourceByWitdh(1200)">
          <img :src="imageSourceByWitdh(500)" :alt="image.caption" class="perfundo__image">
        </picture>
        <figcaption class="perfundo__figcaption" v-html="image.caption"/>
      </figure>
      <a v-if="index > 0" :href="previousImageHref" class="perfundo__prev perfundo__control">{{ previousLabel }}</a>
      <a href="" class="perfundo__close perfundo__control">{{ closeLabel }}</a>
      <a v-if="!isLast" :href="nextImageHref" class="perfundo__next perfundo__control">{{ nextLabel }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Image } from "@/types/Album";

@Options({
  props: {
    folder: {} as string,
    image: {} as Image,
    index: {} as number,
    isLast: {} as boolean
  }
})
export default class AlbumDetailItem extends Vue {
  //properties
  folder!: string;
  image!: Image;
  index!: number;
  isLast!: boolean;

  //computed properties
  get imageExtension() {
    return (this.image.extension === undefined)
      ? ".jpg" :  this.image.extension;
  }

  get previousImageHref() {
    return "#img-" + (this.index - 1).toString();
  }

  get imageId() {
    return "img-" + this.index.toString();
  }

  get ImageHref() {
    return "#" + this.imageId;
  }
  
  get nextImageHref() {
    return "#img-" + (this.index + 1).toString();
  }

  get closeLabel() {
    return process.env.VUE_APP_LOCALIZATION_CLOSE;
  }

  get previousLabel() {
    return process.env.VUE_APP_LOCALIZATION_PREVIOUS;
  }

  get nextLabel() {
    return process.env.VUE_APP_LOCALIZATION_NEXT;
  }

  imageSourceByWitdh(width: number) {
     return "/assets/images/albums/" + this.folder + "/" + this.image.filename + "-" + width + "w" + this.imageExtension;
  }

}
</script>

<style lang="scss">
div.perfundo {
  flex: 1 1 auto;
        
  @include responsive-width-images();

  a.perfundo__link {
    display:contents;
    text-decoration: none;

    figure {
      max-width: $width-thumbnail;
      margin: .5rem;
      background: linear-gradient(to left, $color-from, $color-to);
      box-shadow: 0 0 .5rem 0 $color-shadow-box;

      line-height: 0;

      &:hover{
        transform: scale(1.01);
      }
            
      img, picture img {
        width: 100%;
        max-height: 10em;
        object-fit: cover;
      }
                
      figcaption {
        font-size: 1.2rem;
        text-align: center;
        color: $color-text-light;
        padding: .4rem 1rem 1rem 1rem;

        line-height: 1.5;
      }
    }
  }

  div.perfundo__overlay  {
    figure {
      figcaption {
        a, a:link, a:visited {
          color: $color-text-light;
        }
      }
    }
  }
}

$max-width: 70%;
$margin-right-left: (100% - $max-width) / 2;

div.perfundo {
  .perfundo__overlay {
    background: $color-neutral-dark !important;
    position: fixed !important;
  }
    
  figure.perfundo__figure {
    text-align: center;

    img, figcaption.perfundo__figcaption {
      position: absolute;

      max-width: $max-width; 
        
      left: 0;
      right: 0;
    }

    img {
      height: auto !important;
      max-height: calc(99% - 5em) !important;
      top: 5em;
      margin-right: auto;
      margin-left: auto;
    } 
  
    figcaption.perfundo__figcaption {
      text-align: center !important;
      top: 1.7em;
      margin-left: $margin-right-left; /* used value instead of auto for IE */
      margin-right: $margin-right-left; /* used value instead of auto for IE */
    }
  }
    
  a.perfundo__next, a.perfundo__prev {
    opacity: 1 !important;
  }
}
</style>