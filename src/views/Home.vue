<template>
  <v-container>
    <v-layout>
      <v-flex xs6>
      <h1>Box 1</h1>
      </v-flex>
      <v-flex xs6>
      <h1>Box 2</h1>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>

  export default {
    data: () => ({
      selectedComponent: ''
    })
  }
</script>
