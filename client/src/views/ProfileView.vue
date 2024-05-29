<script setup lang="ts">
import Header from './header/HeaderProfile.vue'
</script>

<template >      
<div class="align-content-stretch" id="profile-page">
  <div class="header">
    <Header></Header> 
  </div>
  <div class="d-flex flex-row ">
    <div class="col-2" id="side-bar">
      <div class="vstack gap-3 mx-2" >
          <a class="p-3 rounded" href="/profile" id="current-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
            </svg>Profile</a>
          <a class="p-3 rounded" href="/products" id="profile-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-cart-check-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708"/>
            </svg>Products</a>
          <a class="p-3 rounded" href="/recipes" id="profile-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-collection-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
              <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1"/>
            </svg>Recipes</a>
          <a class="p-3 rounded" href="/calender" id="profile-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar2-event-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5M11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
            </svg>Calender</a>
          <a class="p-3 rounded" href="/settings" id="profile-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>Settings</a>
      </div>
    </div>
      <div class="col-5">
        <div class="row shadow p-3 m-3 bg-white rounded">
          <div class="col" id="grocery-list"> 
            <div class="d-flex flex-row align-items-stretch" style="border-bottom: 2px solid lightgray;">
              <div class="col-11">
                <h1>Grocery List</h1>
              </div>
              <div class="col align-self-center">
                <button type="button" class="btn btn-secondary" id="add-groceries">Add</button>
              </div>
            </div>
      <!--________Hier werden die Produkte stehen "via javascript"??_________-->
          <div class="d-flex flex-row" style="border-bottom: 2px solid lightgrey;">
        <!--_____Nur ein beispiel_____-->
            
              <div class="col-7">Name</div>
              <div class="col-4">Amount</div>
              <div class="col-1">Info</div>
          </div>
          <div data-bs-spy="scroll" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy" tabindex="0">
            <div class="row">
              <tr>
                <td id="name">Apple</td>
                <td id="count">
                  <div class="container">
                    <input type="number" class="form-control" placeholder="Amount" aria-label="Count" aria-describedby="basic-addon1" min="0">
                  </div>
                </td>
                <td id="info-btn"><button type="button" class="btn btn-link" id="food-info">
                  <img
                alt="house"
                src="../../node_modules/bootstrap-icons/icons/info-circle-fill.svg"
                width="20"
                height="20"
              /></button></td>
              </tr>
              <tr>
                <td>Milka Milk Chocolate</td>
                <td><div class="container">
                    <input type="number" class="form-control" placeholder="Amount" aria-label="Count" aria-describedby="basic-addon1" min="0">
                </div></td>
                <td><button type="button" class="btn btn-link" id="food-info">
                  <img
                    alt="house"
                    src="../../node_modules/bootstrap-icons/icons/info-circle-fill.svg"
                    width="20"
                    height="20"
                  />
                </button></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="col-5 align-items-stretch">
          <div class="d-flex flex-column align-items-stretch">
            <div class="col-12 shadow p-3 m-3 bg-white rounded">
              <div class="d-flex" style="border-bottom: 2px solid lightgray;">
              <div class="col-11">
                <h1>Recipes</h1>
              </div>
              <div class="col align-self-center">
                <button type="button" class="btn btn-secondary" id="add-recipes">Add</button>
              </div>
            </div>
            </div>
            <div class="col-12 shadow p-3 m-3 bg-white rounded">
              <div class="d-flex" style="border-bottom: 2px solid lightgray;">
              <div class="col-11">
                <h1>Friends</h1>
              </div>
              <div class="col align-self-center">
                <button type="button" class="btn btn-secondary" id="add-friends">Add</button>
              </div>
            </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style>
#profile-page{
  height: 100vh;
  width: 100vw;
  background-color: #36a5913b;
}
#side-bar{
  background-color: white;
  width: 15%;
}
#grocery-list{
  background-color: white;
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