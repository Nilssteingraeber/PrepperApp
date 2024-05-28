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
				src="@/assets/logo_prepper.svg"
				width="45"
				height="45"
			/>
			<label  id="brand-name">Prepper</label></RouterLink>
		</div>
		<div class="col">
			<div class="container-fluid">
				<nav class="navbar navbar-light">
					<form class="d-flex">
						<input class="form-control pe-sm-5" type="search" placeholder="Search" aria-label="Search">
						<button class="btn btn-outline-secondary" type="submit">Search</button>
					</form>
				</nav>
			</div>
		</div>
		<div class="col align-content-center" id="header-profile" style="text-align: right;">
			<form id="avatar-dropdown">
				<div class="dropdown">
					<button class="btn btn-link" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						<img
							alt="Avatar"
							class="logo"
							src="@/assets/avatar.svg"
							width="45"
							height="45"
						/></button>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						<li><RouterLink to="/profile"><a class="dropdown-item">Profile</a></RouterLink></li>
						<li><RouterLink to="/products"><a class="dropdown-item">Grocery List</a></RouterLink></li>
						<li><RouterLink to="/recipes"><a class="dropdown-item">Recipes</a></RouterLink></li>
						<li><RouterLink to="/calender"><a class="dropdown-item">Calender</a></RouterLink></li>
						<li><RouterLink to="/settings"><a class="dropdown-item">Settings</a></RouterLink></li>
					</ul>
					</div>
					
			</form>
		</div>
	</div>
	</div>
</template>

<style>
	#logo{
		padding: 5px;
		
	}
	#brand-name{
		font-size: 26px;
		font-weight: bold;
		color: #49416D;
	}
</style>