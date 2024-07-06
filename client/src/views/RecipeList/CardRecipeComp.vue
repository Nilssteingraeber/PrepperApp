<script setup lang="ts">
import CardComp from './CardComp.vue'



</script>


<template>
  <div class="row recipe-list">
    <div class="col-3 recipe-card-entry">
      <CardComp><template #header>
          <div class="image-container">
            <img src="@/assets/bild1.png" class="img-fluid" />
            <div class="overlay">
              <div class="head">Zutaten</div>
              <div class="bdy">
                <ul class="ps-3">
                  <li>Coffee</li>
                  <li>Tea</li>
                  <li>Milk</li>
                </ul>
              </div>
              <div class="foot mt-auto">
                <div class="row">
                  <div class="col-6">
                    <div>Brennwert</div>
                    <div>1000 kcl</div>
                  </div>
                  <div class="col-6">
                    <div>CO2</div>
                    <div>0,752 kg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #body>
          <h5>Salat</h5>
          <div class="d-grid mt-4">
            <button class="btn btn-primary" type="button">Hinzufügen</button>
          </div>
        </template>
      </CardComp>
    </div>
  </div>

</template>

<style scoped>

.recipe-card-entry {
	margin-bottom: 2%;
	padding: 2%;
}

.recipe-list {
	width: 98%;
	margin-left: 2.5%;
}

.image-container {
  position: relative;
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  overflow: hidden;
}

img {
  width: 100%;
  border-radius: inherit;
  transition: transform 0.3s ease-in-out;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 180, 137, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: inherit;
  padding: 16px;
}

.image-container:hover img {
  transform: scale(1.1);
}

.image-container:hover .overlay {
  opacity: 1;
}

.head {
  color: white;
  font-size: 2rem;
  font-weight: 600;
}

.bdy {
  color: white;
  font-weight: 600;
  margin-top: 1rem;
}

.foot {
  border-top: 2px solid white;
  padding-top: 16px;
  width: 100%;
  color: white;
}
</style>
