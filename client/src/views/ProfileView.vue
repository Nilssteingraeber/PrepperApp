<script setup lang="ts">
import Sidebar from './Sidebar/Sidebar.vue';
import Header from './header/HeaderProfile.vue'
</script>

<template >      
<div id="profile-page">
  <div class="header">
    <Header></Header> 
  </div>
  <div class="d-flex flex-row">
    <Sidebar></Sidebar>
    <div class="col-12">
      <div class="row shadow p-3 m-3 bg-white rounded" id="grocery-list">
        <div class="col"> 
          <div class="d-flex flex-row" style="border-bottom: 2px solid lightgray;">
            <div class="col-11">
              <h1>Grocery List</h1>
            </div>
            <div class="col align-self-center">
              <button type="button" class="btn btn-secondary" id="add-groceries">Add</button>
            </div>
          </div>
    <!--________Hier werden die Produkte stehen "via javascript"??_________-->
        <div class="flex-row">
      <!--_____Nur ein beispiel_____-->
          <div class="d-flex flex-row" style="border-bottom: 2px solid lightgrey; font-weight: bold;">
            <div class="col-7">Name</div>
            <div class="col-4">Amount</div> 
            <div class="col-1" style="text-align: center;">Info</div>
          </div>
          <div data-bs-spy="scroll" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy" tabindex="0">
            <div class="d-flex flex-row align-items-center py-2" style="border-bottom: 2px solid lightgray;">
              <div class="col-7">Apple</div>
              <div class="col-4">
                <input type="number" class="form-control" placeholder="Amount" aria-label="Count" aria-describedby="basic-addon1" min="0">
              </div>
              <div class="col-1 ms-2">
                <button type="button" class="btn btn-link" id="food-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center py-2">
              <div class="col-7">Milka Milk Chocolate</div>
              <div class="col-4">
                <input type="number" class="form-control" placeholder="Amount" aria-label="Count" aria-describedby="basic-addon1" min="0">
              </div>
              <div class="col-1 ms-2">
                <button type="button" class="btn btn-link" id="food-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div class="col-5">
      <div class="d-flex flex-column">
        <div class="col-12 shadow p-3 m-3 bg-white rounded" id="recipe-list">
          <div class="d-flex" style="border-bottom: 2px solid lightgray;">
            <div class="col-11">
              <h1>Recipes</h1>
            </div>
            <div class="col align-self-center">
              <button type="button" class="btn btn-secondary" id="add-recipes">Add</button>
            </div>
          </div>
          <div class="vstack gap-1">

          </div>
        </div>
        <div class="col-12 shadow p-3 m-3 bg-white rounded" id="friends-list">
          <div class="d-flex" style="border-bottom: 2px solid lightgray;">
            <div class="col-11">
              <h1>Friends</h1>
            </div>
            <div class="col align-self-center">
              <button type="button" class="btn btn-secondary" id="add-friends">Add</button>
            </div>
          </div>
          <div class="vstack gap-1">

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
#profile-page{
  width: 100vw;
  background-color: #36a5913b;  
}
#sidebar{
  background-color: white;
  width: calc(100vw - 85%);
  height: calc(100vh - 62px);
}
#grocery-list{
  height: calc(100vh - 94px);
}
#recipe-list{
  height: calc((100vh - 126px)/2);
}
#friends-list{
  height: calc((100vh - 126px)/2);
}
#profile-link {
  color: black;
  text-decoration: none;
}
#current-link{
  color: #49416D;
  text-decoration: none;
  background-color: #36a5913b;
}
</style>