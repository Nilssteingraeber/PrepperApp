<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-3" id="logo">
				<RouterLink to="/"><img alt="Prepper logo" class="logo" src="@/assets/logo_prepper.svg" width="45"
						height="45" /><label id="brand-name">Prepper</label></RouterLink>
			</div>
			<div class="col-6 align-self-center">
				<form class="d-flex">
					<input class="form-control pe-sm-5 m-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-secondary m-2" type="button">Search</button>
				</form>
			</div>
			<div class="col-3" id="header-profile" style="text-align: right;">
				<form id="avatar-dropdown">
					<div class="dropdown">
						<button class="btn btn-link" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
							aria-expanded="false">
							<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#49416D"
								class="bi bi-person-fill" viewBox="0 0 16 16">
								<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
							</svg>
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<RouterLink to="/profile" id="header-link"><a class="dropdown-item">Profile</a>
								</RouterLink>
							</li>
							<li>
								<RouterLink to="/products" id="header-link"><a class="dropdown-item">Products</a>
								</RouterLink>
							</li>
							<li>
								<RouterLink to="/recipes" id="header-link"><a class="dropdown-item">Recipes</a>
								</RouterLink>
							</li>
							<li>
								<RouterLink to="/calender" id="header-link"><a class="dropdown-item">Calender</a>
								</RouterLink>
							</li>
							<li>
								<RouterLink to="/settings" id="header-link"><a class="dropdown-item">Settings</a>
								</RouterLink>
							</li>
						</ul>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style>
#logo {
	padding: 5px;
}

#brand-name {
	font-size: 26px;
	font-weight: bold;
	color: #49416D;
}

#header-link {
	text-decoration: none;
}
</style>