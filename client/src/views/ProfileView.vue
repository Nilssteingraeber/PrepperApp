<script setup lang="ts">
import Header from './header/HeaderProfile.vue'
</script>


<template>    

<div class="page">

<div class="row">
  <div class="col-12">
    <div class="header">
      <Header></Header> 
    </div>
  </div>
  <div class="d-flex align-items-stretch">
    <div class="col-2" id="side-bar">
      <div class="container-sm">
        <div class="btn-group-vertical"  role="group" aria-label="Basic example">
          <button type="button" class="btn btn-link mx-1">
            <img
							alt="house"
							src="../../node_modules/bootstrap-icons/icons/house-fill.svg"
							width="20"
							height="20"
              style="margin-right: 1%;"
						/>Profile</button>
          <button type="button" class="btn btn-link mx-1">
            <img
							alt="grocery list"
							src="../../node_modules/bootstrap-icons/icons/cart-check-fill.svg"
							width="20"
							height="20"
              style="margin-right: 1%;"
						/>Grocery List</button>
          <button type="button" class="btn btn-link mx-1">
            <img
							alt="recipes"
							src="../../node_modules/bootstrap-icons/icons/collection-fill.svg"
							width="20"
							height="20"
              style="margin-right: 1%;"
						/>Recipes</button>
          <button type="button" class="btn btn-link mx-1">
            <img
							alt="calender"
							src="../../node_modules/bootstrap-icons/icons/calendar2-event-fill.svg"
							width="20"
							height="20"
              style="margin-right: 1%;"
						/>Calender</button>
          <button type="button" class="btn btn-link mx-1">
            <img
							alt="settings"
							src="../../node_modules/bootstrap-icons/icons/gear-fill.svg"
							width="20"
							height="20"
              style="margin-right: 1%;"
						/>Settings</button>
        </div>
      </div>
    </div>
      <div class="col-5 align-self-stretch">
        <div class="container-sm shadow p-3 m-3 bg-white rounded align-self-stretch">
          <div class="col" id="grocery-list" style="order: 1px solid green;">
            <div class="d-flex" style="border-bottom: 3px solid lightgray;">
            <div class="col-11">
              <h1>Grocery List</h1>
            </div>
            <div class="col align-self-center">
              <button type="button" class="btn btn-secondary align-self-">Add</button>
            </div>
          </div>
      <!--________Hier werden die Produkte stehen "via javascript"??_________-->
          <div id="products">
            <div class="form-check" style="border-bottom: 3px solid lightgray;">
              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1"></label>
            </div>

            <ul>
              <li></li>
            </ul>
          </div>
        </div>
        </div>
      </div>
      <div class="col-5">
        <div class="container-sm shadow p-3 m-3 bg-white rounded align-self-stretch">
          <div class="col" style="border: 1px solid black;">

          </div>
          <div class="col" style="border: 1px solid blue;">

          </div>
        </div>
      </div>
  </div>
</div>
</div>
</template>

<style>
#side-bar{
  background-color: white;
  width: 13%;
  height: 449%;
}
#grocery-list{
  background-color: white;
}
.page{
  height: 100vh;
  width: 100vw;
  background-color: #36a5913b;
}
</style>