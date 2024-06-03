<script setup lang="ts">
import Header from './header/HeaderProfile.vue'
</script>

<template>
  <div id="home">
    <div class="home-overlay">
      <div class="header">
        <Header></Header> 
      </div>
      <h1 id="text">CREATE YOUR GROCERY LIST</h1>
    </div>
  </div>
</template>


<style>
  #text{
    color: white;
    font-size: 75px;
    align-content: center;
    padding-top: 20rem;
    padding-left: 4%;
    padding-right: 30%;
  }

  #home{
    height: 100vh;
    width: auto;
    background-image: url("@/assets/background.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    
  }
  .home-overlay{
    height: 100vh;
    width: auto;
    background-color: #363636d5;
  }
  .header{
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    border-bottom: 1px solid lightgray;
    padding: 1px;
    
  }
</style>