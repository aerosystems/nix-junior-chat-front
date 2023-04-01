<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      // Отримання токенів з сервера тут
    }
  }
}
</script>
