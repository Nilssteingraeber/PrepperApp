<script setup lang="ts">
import CardComp from '@/components/widgets/CardComp.vue'
</script>

<template>
  <section>
    <div class="row">
      <div class="col-sm-6 col-12 mb-4">
        <CardComp>
          <template #header>
            <div class="card-header d-flex align-items-center bg-second py-3">
              <span class="material-symbols-rounded me-3"> shopping_cart </span>
              <h5 class="mb-0">
                <strong>Grocery List</strong>
              </h5>
              <button type="button" class="btn btn-primary ms-auto">Add</button>
            </div>
          </template>
          <template #body>
            <table class="table table-hover table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Info</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td><span class="material-symbols-rounded"> info </span></td>
                </tr>
                <tr>
                  <th scope="row">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </template>
        </CardComp>
      </div>
      <div class="col-sm-6 col-12 mb-4">
        <CardComp>
          <template #header>
            <div class="card-header d-flex align-items-center py-3">
              <span class="material-symbols-rounded me-3 bg-second"> receipt_long </span>
              <h5 class="mb-0">
                <strong>Recipes</strong>
              </h5>
              <button type="button" class="btn btn-primary ms-auto">Add</button>
            </div>
          </template>
          <template #body>
            <table class="table table-hover table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </template>
        </CardComp>
      </div>
    </div>
  </section>
</template>
