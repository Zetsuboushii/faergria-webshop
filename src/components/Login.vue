<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Benutzername:</label>
      <input type="text" id="username" v-model="username">
      <label for="password">Passwort:</label>
      <input type="password" id="password" v-model="password">
      <button type="submit">Einloggen</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Cookies from 'js-cookie'
import {API_URL} from "@/apiUrl";

const userID = ref('')
const username = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await fetch( API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })
    const data = await response.json()
    username.value = data.data.username
    userID.value = data.data.user_id
    Cookies.set('loggedIn', 'true', {expires: 7, sameSite: 'None', secure: true});
    Cookies.set('username', username.value, {expires: 7, sameSite: 'None', secure: true});
    Cookies.set('userID', userID.value, {expires: 7, sameSite: 'None', secure: true});
  } catch (error) {
    console.error('Fehler bei der Anmeldung:', error);
    alert('Fehler bei der Anmeldung. Bitte versuche es später erneut.');
  }
}
</script>

<style scoped>

</style>
