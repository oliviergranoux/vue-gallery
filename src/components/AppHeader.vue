<template>
  <header>
    <router-link to="/"><h1>{{ title }}</h1></router-link>
    <nav>
      <ul>
        <li><router-link to="/albums">Albums</router-link></li>
        <li v-if="isAnAlbum"><router-link class="selected" :to="albumPath">&nbsp;>&nbsp;&nbsp;{{ albumName }}</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class AppHeader extends Vue {
  data() {
    return {
      title: process.env.VUE_APP_TITLE
    };
  }

  //computed properties
  get isAnAlbum() {
    return this.$route.params.folder;
  }

  get albumPath() {
    return "/album/" + this.$route.params.folder;
  }

  get albumName() {
    return this.$route.params.folder;
  }
}
</script>

<style lang="scss" scoped>
header {
  @include layout-main;

  font-family: serif;
  text-align: center; 

  @include responsive($device-medium) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  a {
    text-decoration: none;

    &:link, &:visited {
      color: $color-text-dark;
    }

    h1 {
      font-size: 2.6rem;
      font-weight: 500; 
      line-height: 1.2;
      text-shadow: 2px 2px 2px $color-shadow-text;

      margin: .5rem 0;

      text-align: center;
      align-items: center;

      @include responsive($device-medium) {
        display: inline-flex;
        text-align: left;
      }
    }
  }

  nav {
    font-size: 1.3rem;

    @include responsive($device-medium) {
      display: inline-flex;
      text-align: right;
      align-items: center;
    }

    ul {
      text-align: center;
      list-style-type: none;
      padding-left: 0;
    
      li {
        display: inline;
        margin: .2rem;
      }

      a {
        &:link, &:visited {
          color: $color-link;
        }
          
        &:hover {
          text-decoration: underline;
        }
    
        &.selected, &.router-link-active {
          color: $color-selected; 
            
          // display:none;
          pointer-events: none;
          cursor: default;
          text-decoration: none;
        }
      }
    }
  }
}
</style>