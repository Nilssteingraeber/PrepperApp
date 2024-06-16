<script setup lang="ts">
import Header from './header/HeaderProfile.vue';
import $ from 'jquery';
import CycleSelectionHeader from "./CycleHeader/CycleSelectionHeader.vue"
import {Cycle, CycleType} from '@/code/cycle/Cycle';

const currentCycle = new Cycle(CycleType.ONE_WEEK)

$(function() {
	$(".progress").each(function() {
		const value: number = $(this).attr('data-value') as unknown as number;
		const left = $(this).find('.progress-left .progress-bar');
		const right = $(this).find('.progress-right .progress-bar');

		if (value > 0) {
			if (value <= 50) {
			right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
			} else {
			right.css('transform', 'rotate(180deg)')
			left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
			}
		}
	})
	function percentageToDegrees(percentage: number): number {
		return percentage / 100 * 360
	}
});
</script>


<template>
<div id="calender-page">
	<div class="header">
		<Header></Header>
	</div>
	<div class="d-flex flex-row">
		<div class="col-2" id="sidebar">
			<div class="vstack gap-2 m-2" >
				<a class="p-3 rounded" href="/profile" id="profile-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-house-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
						<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
						<path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
					</svg>Profile</a>
				<a class="p-3 rounded" href="/products" id="profile-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-cart-check-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
					<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708"/>
					</svg>Products</a>
				<a class="p-3 rounded" href="/recipes" id="profile-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-collection-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
					<path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1"/>
					</svg>Recipes</a>
				<a class="p-3 rounded" href="/calender" id="current-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#49416D" class="bi bi-calendar2-meal-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
					<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5M11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
					</svg>Calender</a>
				<a class="p-3 rounded" href="/settings" id="profile-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-gear-fill" viewBox="0 0 16 16" style="margin-right: 2%;">
					<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
					</svg>Settings</a>	
			</div>
		</div>

		<div class="col-10">
			<CycleSelectionHeader :cycle="currentCycle"></CycleSelectionHeader>
			<div class="col-12 shadow p-3 m-3 bg-white rounded" id="calender-calories">
				<div class="h2 font-weight-bold text-center" id="change-calories-week-carbs"  style="border-bottom: 2px solid lightgray;">Calories eaten today</div>
				<div class="d-flex flex-row">
					<div class="col-4 align-self-center">
						<div class="form-check offset-5">
							<input class="form-check-input" type="checkbox" value="" id="flexCheckBreakfast" checked>
							<label class="form-check-label" for="flexCheckBreakfast">Breakfast</label>
							</div>
						<div class="form-check offset-5">
							<input class="form-check-input" type="checkbox" value="" id="flexCheckLunch" checked>
							<label class="form-check-label" for="flexCheckLunch">Lunch</label>
						</div>
						<div class="form-check offset-5">
							<input class="form-check-input" type="checkbox" value="" id="flexCheckDinner">
							<label class="form-check-label" for="flexCheckDinner">Dinner</label>
						</div>
					</div>
					<div class="col-4 align-content-center" style="border-left: 2px solid lightgray; border-right: 2px solid lightgray;">
						<div class="progress mx-auto" data-value='75'>
							<span class="progress-left">
								<span class="progress-bar border-primary"></span>
							</span>
							<span class="progress-right">
								<span class="progress-bar border-primary"></span>
							</span>
							<div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
								<div class="h5 font-weight-bold text-center" id="change-calories">1420 Calories</div>
							</div>
						</div>
					</div>
					<div class="col-4 text-start">
						<div class="h4 font-weight-bold offset-4" id="change-calories-day-carbs">Carbohydrates: 213g</div>
						<div class="h4 font-weight-bold offset-4" id="change-calories-day-protein">Protein: 95g</div>
						<div class="h4 font-weight-bold offset-4" id="change-calories-day-fat">Fat: 62g</div>
					</div>
				</div>
			</div>
			
			
			<div class="col-12 shadow p-3 m-3 bg-white rounded" id="calender-bot">
				<div class="row" style="border-bottom: 2px solid lightgray;">
					<div class="h1 font-weight-bold text-center" id="change-calories">Continue planning your week</div>
				</div>
				<div class="row">
				<div class="col-3"></div>
				<div class="col-6 align-items-center">
					<div class="calender-content w-100">
						<div class="calendar-container">
							<div class="calendar">  
								<div class="year-header"> 
									<button class="btn link-secondary left-button" id="prev">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
										</svg>
									</button>
									<span class="year" id="label"></span> 
									<button class="btn link-secondary right-button" id="next">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
										</svg>
									</button>
								</div> 
								<table class="months-table w-100"> 
									<tbody>
									<tr class="months-row">
										<td class="month">Jan</td> 
										<td class="month">Feb</td> 
										<td class="month">Mar</td> 
										<td class="month">Apr</td> 
										<td class="month">May</td> 
										<td class="month">Jun</td> 
										<td class="month">Jul</td>
										<td class="month">Aug</td> 
										<td class="month">Sep</td> 
										<td class="month">Oct</td>          
										<td class="month">Nov</td>
										<td class="month">Dec</td>
									</tr>
									</tbody>
								</table> 
								
								<table class="days-table w-100"> 
									<td class="day">Sun</td> 
									<td class="day">Mon</td> 
									<td class="day">Tue</td> 
									<td class="day">Wed</td> 
									<td class="day">Thu</td> 
									<td class="day">Fri</td> 
									<td class="day">Sat</td>
								</table> 
								<div class="frame"> 
									<table class="dates-table w-100"> 
									<tbody class="tbody">             
									</tbody> 
									</table>
								</div> 
								<button class="button" id="add-button">Add Meal</button>
							</div>
						</div>
					<div class="meals-container">
					</div>
					<div class="dialog" id="dialog">
						<h2 class="dialog-header"> Add New Meal </h2>
							<form class="form" id="form">
								<div class="form-container" align="center">
									<label class="form-label" id="valueFromMyButton" for="name">Meal</label>
									<input class="form-control" type="text" id="name">
									
									<div class="d-flex flex-row">
										<div class="col-5"></div>
										<div class="col-2" id="radio-checks">
											<div class="form-check">
												<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioBreakfast" value="Breakfast">
												<label class="form-check-label" for="flexRadioBreakfast">Breakfast</label>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioLunch" value="Lunch">
												<label class="form-check-label" for="flexRadioLunch">Lunch</label>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDinner" value="Dinner">
												<label class="form-check-label" for="flexRadioDinner">Dinner</label>
											</div>
										</div>
										<div class="col-5"></div>
									</div>
									<input type="button" value="Cancel" class="button" id="cancel-button">
									<input type="button" value="OK" class="button" id="ok-button">
								</div>
							</form>
						
						</div>
					</div>
				</div>
				<div class="col"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<style>
#calender-page{
	background-color: #36a5913b;
	width: 100vw;
	height: 100vh;
}

#calender-bot{
	height: calc(100vh - 300px);
}

/*_______Progressbar______*/
.progress {
	width: 100px;
	height: 100px;
	background: none;
	position: relative;
}

.progress::after {
	content: "";
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 6px solid #eee;
	position: absolute;
	top: 0;
	left: 0;
}

.progress>span {
	width: 50%;
	height: 100%;
	overflow: hidden;
	position: absolute;
	top: 0;
	z-index: 1;
}

.progress .progress-left {
	left: 0;
}

.progress .progress-bar {
	width: 100%;
	height: 100%;
	background: none;
	border-width: 6px;
	border-style: solid;
	position: absolute;
	top: 0;
}

.progress .progress-left .progress-bar {
	left: 100%;
	border-top-right-radius: 80px;
	border-bottom-right-radius: 80px;
	border-left: 0;
	-webkit-transform-origin: center left;
	transform-origin: center left;
}

.progress .progress-right {
	right: 0;
}

.progress .progress-right .progress-bar {
	left: -100%;
	border-top-left-radius: 80px;
	border-bottom-left-radius: 80px;
	border-right: 0;
	-webkit-transform-origin: center right;
	transform-origin: center right;
}

.progress .progress-value {
	position: absolute;
	top: 0;
	left: 0;
}
</style>