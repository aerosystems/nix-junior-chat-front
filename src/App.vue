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
import axios from 'axios'
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
      console.log(this.username, this.password)
      
      axios.post('http://localhost:80/v1/user/login', {
                    email: this.username,
                    password: this.password
                })
                .then(function (response) {
                    console.log(response.data.response)
                })
                .catch(function (error) {
                    console.log(error.response.data)
                });          
    }
  }
}
</script>
