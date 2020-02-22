<template>
  <div id="main" class="flex overflow-hidden">
    <div class="fixed w-screen h-8 bg-green-400">
      <nuxt-link
        :active-class="`border-b border-gray-700 font-semibold`"
        to="/dashboard"
      >
        Dashboard
      </nuxt-link>
    </div>

    <div id="content" class="overflow-y-auto w-screen mt-8 px-6 pt-4">
      <nuxt />
    </div>
  </div>
</template>
