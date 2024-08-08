<script setup>
import CatNav from "@/components/CatNav.vue";
</script>

<template>
  <CatNav :category="false" />
    <section>
        <div class="container">
            <div class="content">
                <h2 class="mb-5">ABOUT COMFORT WINGS</h2>
                <h3 class="fs-3 text-center mb-3">OVER 39 YEARS OF EMBRACING A HEALTHY LIFESTYLE</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tempore quam incidunt minus architecto. Voluptates minima, neque earum nobis laborum perferendis ullam <br><br> aliquam sit recusandae nulla aspernatur iste expedita a possimus quia odit ipsa fugit vero tempora suscipit architecto modi sed facere! Pariatur et quos repellendus ipsum aut omnis a, vero quasi, accusamus nemo illo doloribus voluptates fugit?  <br> Officia tenetur facere ipsa ad maxime, excepturi eligendi eos beatae accusamus, debitis aut suscipit deserunt ab minima dignissimos quia sint dolores. Voluptatibus modi quam laboriosam animi? Nisi accusamus, esse, sunt laudantium nesciunt perferendis  <br> delectus labore animi eos dicta molestias suscipit, dolore vitae!</p>
            </div>
            <div class="mb-5">
                <iframe width="100%" height="450px" src="https://www.youtube.com/embed/S-A0qLTxf-U?si=JulyLlKcLWHaOG2G" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .content {
        max-width: 899px;
        margin-inline: auto;
        padding: 50px 0;
    }
</style>