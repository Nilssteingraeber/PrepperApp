<script setup lang="ts">
import Header from './header/HeaderProfile.vue';
import $ from 'jquery';
import CycleSelectionHeader from "./CycleHeader/CycleSelectionHeader.vue"
import {Cycle, CycleType} from '@/code/cycle/Cycle';
import Sidebar from './Sidebar/Sidebar.vue';

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
<div class="page">
	<div class="header">
		<Header></Header>
	</div>
	<div class="d-flex flex-row">
		<Sidebar></Sidebar>
		<div class="col-10">
			<CycleSelectionHeader></CycleSelectionHeader>
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