<template>
  <section
    class="m-0 flex flex-col w-screen justify-center bg-gray-800 h-screen text-gray-100"
  >
    <div class="px-6 py-8 px-8 md:px-48">
      <h1>PICASSO</h1>
    </div>

    <div class="text-6xl my-auto mx-auto md:mx-48">
      <nuxt-link to="/dashboard" class="hover:underline">
        Dashboard
      </nuxt-link>
      <br />

      <nuxt-link class="hover:underline" to="/users">
        Users
      </nuxt-link>
      <br />

      <nuxt-link class="text-teal-400 hover:underline" to="/about">
        About
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {}
</script>
