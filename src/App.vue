<template>
  <AppHeader></AppHeader>

  <main>
    <router-view />
  </main>

  <AppFooter></AppFooter>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

@Options({
  components: {
    AppFooter,
    AppHeader
  }
})
export default class App extends Vue {
  // setTitle(pageName: string) {
  //   const titleEl = document.querySelector('head title');
  //   if (titleEl != null) {
  //     titleEl.textContent = process.env.VUE_APP_TITLE + " - " + pageName;
  //   }
  // }

  // created() {
  //   const titleEl = document.querySelector('head title');
  //   if (titleEl != null) {
  //     titleEl.textContent = process.env.VUE_APP_TITLE;
  //   }
  // }
}

</script>

<style lang="scss">
* {
  box-sizing: border-box;
}  

html, body, #app {
  height: 100%;
  margin:0;
  padding:0;
}

#app {
  font-size: 100%;
  font-weight: 400;
  font-family: sans-serif;
  line-height: 1.5;
  color: $color-text-dark; 
  background: $color-background; 
} 

main {
  min-height: calc(100% - 12rem);
}

main > section {
  @include layout-main; 
}
</style>
