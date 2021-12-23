<template>
  <div id="app" class="d-flex flex-column">
    <Nav />
    <router-view />
    <Footer class="mt-auto" />
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Nav,
    Footer,
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Taipei Sans TC';
}

div,
p,
a,
input,
label,
textarea,
span,
ul,
li {
  font-family: 'Noto Sans TC';
}

a,
a:hover {
  color: var(--bs-body-color);
  text-decoration: none;
}
</style>
