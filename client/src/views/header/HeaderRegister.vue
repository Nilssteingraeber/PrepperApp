<script setup lang="ts">
import {RouterLink} from 'vue-router'
</script>

<template>
	<div class="container-fluid">
	<div class="row">
		<div class="col" id="logo">
			<RouterLink to="/"><img
				alt="Prepper logo"
				class="logo"
				src="@/assets/logo_prepper_icon.svg"
				width="45"
				height="45"
			/>
			<label class="brand-name">Prepper</label></RouterLink>
			<!--<div class="links">
				
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
				Login
			</div> -->
		</div>
		<div class="col align-content-center" id="header-profile" style="text-align: right;">
			<form id="button-header">
				<RouterLink to="/login"><button type="button" class="btn btn-primary mx-3">Sign In</button></RouterLink>
				<RouterLink to="/register"><button type="button" class="btn btn-secondary">Register</button></RouterLink>
			</form>
		</div>
	</div>
	</div>
</template>

<style>
	#logo{
		padding: 5px;
	}
	.brand-name{
		font-size: 26px;
		color: #49416D;
		font-weight: bold;
	}
</style>