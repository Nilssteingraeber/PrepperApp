<script setup lang="ts">
import {RouterLink} from 'vue-router'
</script>

<template>
<div class="login">
<div class="login-overlay">
  <div class="container-xl">
  <div class="row align-content-center" id="first-row">
  <div class="col"></div>
    <div class="col-7 shadow p-3 m-3 bg-white rounded">
      <div class="row">
      <div class="col-5" id="login-area" style="border-right: 3px solid lightgray;">
        <div class="d-flex flex-column" id="second-row">
          <div class="d-flex flex-column col-12 align-items-center">
            <RouterLink to="/">
              <img
                alt="Prepper logo"
                class="logo"
                src="@/assets/logo_prepper_text.svg"
                width="125"
                height="125"
              />
            </RouterLink>
          </div>
        </div>
          <div class="row align-self-stretch" id="login-text">
            <div class="col">
              <label style="font-size: medium;">Don't have an Account?
                <RouterLink to="/register" style="text-decoration: none;">
                  <a style="color: #49416D;">Register</a>
                </RouterLink>
              </label>
              <label style="font-size: small;">
                Read our
                <a style="color: #49416D;">terms</a>
                and
                <a style="color: #49416D">conditions</a>
              </label>
            </div>
          </div>
      
    </div>

      <div class="col align-content-center " id="login-area">
        <div class="container-sm">
          <div class="h1 bold text-start">Account Login</div>
          <div class="input-group-lg">
            <div class="mb-3">
              <label for="loginEmail" class="form-label">E-mail address</label>
              <input type="email" class="form-control" id="loginEmail" placeholder="E-Mail">
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="loginPassword" placeholder="Password">
            </div>

              <div class="mb-3 form-check">
                <div class="row">
                <div class="col align-content-center">
                  <input type="checkbox" class="form-check-input" id="rememberMe">
                  <label class="form-check-label" for="frememberMe">Remember Me</label>
                </div>
                <div class="col text-end mx-auto">
                  <button type="button" class="btn btn-link" id="forgotPassword">Forgot Password</button>
                </div>
              </div>
              </div>

            <div class="d-grid gap-2 col-12 mx-auto">
              <button type="button" class="btn btn-secondary">Sign In</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div class="col"></div>
  </div>
  </div>
  </div>
  </div>
</template>

<style>
  .login{
    height: 100vh;
    width: auto;
    background-image: url("@/assets/background.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
  }

  .login-overlay{
    height: 100vh;
    width: auto;
    background-color: #39b4a0d3;
  }

  #login-area{
    padding: 1%;
    background-color: white;
  }

  #first-row{
    height: 100vh;
  }

  #second-row{
    height: 40vh;
  }

  #login-text{
    color: grey;
  }
</style>
