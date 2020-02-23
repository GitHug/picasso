<template>
  <div
    id="main"
    class="m-0 flex flex-col w-screen bg-gray-800 h-screen text-gray-100"
  >
    <nav class="flex items-center px-6">
      <nuxt-link to="/">
        PICASSO
      </nuxt-link>

      <ul class="flex text-xl p-4 md:px-32">
        <li class="mr-4">
          <nuxt-link active-class="active" to="/dashboard">
            Dashboard
          </nuxt-link>
        </li>
        <li class="mr-4">
          <nuxt-link active-class="active" to="/users">
            Users
          </nuxt-link>
        </li>

        <li>
          <nuxt-link active-class="active" to="/about">
            About
          </nuxt-link>
        </li>
      </ul>
    </nav>

    <div id="content" class="overflow-y-auto w-screen px-6 pt-4">
      <nuxt />
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply border-b-2 border-teal-400 text-teal-400 font-semibold;
}
</style>
