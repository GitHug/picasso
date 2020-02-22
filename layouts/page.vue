<template>
  <div id="main" class="flex overflow-hidden">
    <nav class="fixed w-screen h-8 bg-green-400">
      <nuxt-link
        :active-class="`border-b border-gray-700 font-semibold`"
        to="/dashboard"
      >
        Dashboard
      </nuxt-link>

      <nuxt-link
        :active-class="`border-b border-gray-700 font-semibold`"
        to="/users"
      >
        users
      </nuxt-link>
    </nav>

    <div id="content" class="overflow-y-auto w-screen mt-8 px-6 pt-4">
      <nuxt />
    </div>
  </div>
</template>
