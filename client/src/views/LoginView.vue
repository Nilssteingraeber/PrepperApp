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
        <div class="row justify-content-around" id="second-row" >
          <div class="col-md-12 align-self-around offset-md-6">
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
          <div class="col-12 align-self-end" id="login-text">
            <form>
              <label style="font-size: medium;">Don't have an Account?
                <RouterLink to="/register">
                  <a style="color: #49416D;">Register</a>
                </RouterLink>
              </label>
              <label style="font-size: small;">
                Read our
                <a style="color: #49416D;">terms</a>
                and
                <a style="color: #49416D">conditions</a>
              </label>
            </form>
          </div>
      </div>
    </div>

      <div class="col align-content-center " id="login-area">
        <div class="container-sm">
          <h1>Account Login</h1>
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1">
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1">
            </div>

              <div class="mb-3 form-check">
                <div class="row">
                <div class="col align-content-center">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="form-check-input">Remember Me</label>
                </div>
                <div class="col text-end mx-auto">
                  <button type="button" class="btn btn-link">Forgot Password</button>
                </div>
              </div>
              </div>

            <div class="d-grid gap-2 col-12 mx-auto">
              <button type="submit" class="btn btn-secondary">Sign In</button>
            </div>
          </form>
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
    height: 50vh;
    background-color: white;
  }

  #first-row{
    height: 100vh;
  }

  #second-row{
    padding-top: 20px;
    height: 50vh;
  }

  #login-text{
    padding-left: 20px;
    padding-bottom: 10px;
    color: grey;
  }
</style>
