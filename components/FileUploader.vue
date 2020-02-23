<template>
  <div
    class="relative"
    :class="{
      'bg-teal-400': state === DRAGGING
    }"
    @drop.prevent="dispatchAction('drop', $event)"
    @dragover.prevent
    @dragenter="transitionTo(DRAGGING)"
    @dragleave="transitionTo(IDLE)"
  >
    <input
      type="file"
      :accept="accept.join(',')"
      class="cursor-pointer relative block opacity-0 w-full h-full p-4 z-50"
      @input="dispatchAction('upload', $event)"
    />
    <div
      class="text-center flex justify-center items-center h-full absolute top-0 right-0 left-0 m-auto"
    >
      <strong>Choose a file</strong>&nbsp;<span> or drag it here.</span>
    </div>
  </div>
</template>

<script>
export const { IDLE, DRAGGING } = {
  IDLE: 'idle',
  DRAGGING: 'dragging'
}

export default {
  name: 'FileUploader',

  props: {
    accept: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      state: IDLE,
      transitions: {
        [IDLE]: {
          drag: () => {
            this.transitionTo(DRAGGING)
          },
          upload: (event) => {
            const file = this.getFileFromEvent(event.target)
            this.$emit('upload', file)
          }
        },
        [DRAGGING]: {
          drop: (event) => {
            const file = this.getFileFromEvent(event.dataTransfer)
            if (this.isValidFileType(file)) {
              this.$emit('upload', file)
            }
            this.transitionTo(IDLE)
          }
        }
      }
    }
  },

  created() {
    Object.assign(this, { IDLE, DRAGGING })
  },

  methods: {
    dispatchAction(actionName, payload) {
      const actions = this.transitions[this.state]
      const action = actions[actionName]

      if (action) {
        action(payload)
      }
    },

    transitionTo(state) {
      this.state = state
    },

    getFileFromEvent(event) {
      const droppedFiles = event.files
      if (!droppedFiles) return
      const file = [...droppedFiles][0]
      return file
    },

    isValidFileType(file) {
      return this.accept.includes(file.type)
    }
  }
}
</script>
