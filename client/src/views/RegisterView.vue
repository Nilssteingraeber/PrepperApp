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
				<div class="d-flex flex-column" style="border-top: 2px solid lightgray;">
					<div class="h1 bold mt-2">Register</div>
					<div class="mb-2">
						<label for="registerName" class="form-label">Name</label>
						<input type="text" class="form-control" id=">registerName" placeholder="Name">
					</div>
					<div class="mb-2">
						<label for="registerLastname" class="form-label">Lastname</label>
						<input type="text" class="form-control" id=">registerLastname" placeholder="Lastname">
					</div>
					<div class="mb-2">
						<label for="registerEmail" class="form-label">E-mail</label>
						<input type="email" class="form-control" id="registerEmail" placeholder="E-Mail">
					</div>
					<div class="mb-4">
						<label for="registerPassword" class="form-label">Password</label>
						<input type="password" class="form-control" id="registerPassword" placeholder="Password">
					</div>
					<div class="d-flex flex-column col-12 mt-2" id="btn-register">
						<button type="button" class="btn btn-secondary">Register</button>
					</div>
					<div class="col" id="register-text">
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
	padding: 2%;
	background-color: white;
}

#register-logo{
	text-align: center;
	padding-bottom: 5%;
}

#first-row{
	height: 100vh;
}

</style>
