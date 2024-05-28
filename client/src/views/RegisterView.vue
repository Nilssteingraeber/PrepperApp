<script setup lang="ts">
import {RouterLink} from 'vue-router'
</script>

<template>
	<div class="register">
	<div class="register-overlay">
	<div class="container">
		<div class="row align-content-center" id="first-row">
			<div class="col-4"></div>
			<div class="col-4 align-content-center shadow p-3 mb-5 bg-white rounded" id="register-area">
				<div id="register-logo">
				<RouterLink to="/" >
					<img
						alt="Prepper logo"
						src="@/assets/logo_prepper_text.svg"
						width="125"
						height="125"
					/></RouterLink>
				</div>
			<form>
				<div class="container">
					<h1>Register</h1>
					<div class="mb-3">
						<label for="exampleInputFirstName1" class="form-label">First Name</label>
						<input type="text" class="form-control" id="exampleInputFirstName1">
					</div>
					<div class="mb-3">
						<label for="exampleInputLastName1" class="form-label">First Name</label>
						<input type="text" class="form-control" id="exampleInputLastName1">
					</div>
					<div class="mb-3">
						<label for="exampleInputEmail1" class="form-label">Email address</label>
						<input type="email" class="form-control" id="exampleInputEmail1">
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" class="form-label">Password</label>
						<input type="password" class="form-control" id="exampleInputPassword1">
					</div>
					<div class="d-grid gap-2 col-12 mx-auto" id="btn-register">
						<button type="submit" class="btn btn-secondary">Register</button>
					</div>
					<div class="col align-self-end" id="register-text">
					<label style="font-size: small; color:grey">
						Read our
						<a style="color: #49416D;">terms</a>
						and
						<a style="color: #49416D">conditions</a>
					</label>
				</div>
			</div>
			</form>
			</div>
			<div class="col-4"></div>
		</div>
	</div>
	</div>
	</div>
</template>

<style>
.register{
	height: 100vh;
	width: auto;
	background-image: url("@/assets/background.svg");
	background-repeat: no-repeat;
	background-position: center;
	background-attachment: fixed;
	background-size: cover;
}

.register-overlay{
	height: 100vh;
	width: auto;
	background-color: #39b4a0d3;
}

#register-area{
	height: 70vh;
	background-color: white;
}

#register-logo{
	text-align: center;
	margin-top: 0px;
	margin-bottom: 10px;
}

#btn-register{
	margin-top: 30px;
}

#first-row{
	height: 100vh;
}

</style>
