(function($) {

	"use strict";

	// Setup the calendar with the current date
$(document).ready(function(){
    var date = new Date();
    var today = date.getDate();
    // Set click handlers for DOM elements
    $(".right-button").click({date: date}, next_year);
    $(".left-button").click({date: date}, prev_year);
    $(".month").click({date: date}, month_click);
    $("#add-button").click({date: date}, new_meal);
    // Set current month as active
    $(".months-row").children().eq(date.getMonth()).addClass("active-month");
    init_calendar(date);
    var meals = check_meals(today, date.getMonth()+1, date.getFullYear());
    show_meals(meals, months[date.getMonth()], today);
});

// Initialize the calendar by appending the HTML dates
function init_calendar(date) {
    $(".tbody").empty();
    $(".meals-container").empty();
    var calendar_days = $(".tbody");
    var month = date.getMonth();
    var year = date.getFullYear();
    var day_mealtime = days_in_month(month, year);
    var row = $("<tr class='table-row'></tr>");
    var today = date.getDate();
    // Set date to 1 to find the first day of the month
    date.setDate(1);
    var first_day = date.getDay();
    // 35+firstDay is the number of date elements to be added to the dates table
    // 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
    for(var i=0; i<35+first_day; i++) {
        // Since some of the elements will be blank, 
        // need to calculate actual date from index
        var day = i-first_day+1;
        var curr_date = null;
        // If it is a sunday, make a new row
        if(i%7===0) {
            calendar_days.append(row);
            row = $("<tr class='table-row'></tr>");
        }
        // if current index isn't a day in this month, make it blank
        if(i < first_day || day > day_mealtime) {
            curr_date = $("<td class='table-date nil'>"+"</td>");
            row.append(curr_date);
        }   
        else {
            curr_date = $("<td class='table-date'>"+day+"</td>");
            var meals = check_meals(day, month+1, year);
            if(today===day && $(".active-date").length===0) {
                curr_date.addClass("active-date");
                show_meals(meals, months[month], day);
            }
            // If this date has any meals, style it with .meal-date
            if(meals.length!==0) {
                curr_date.addClass("meal-date");
            }
            // Set onClick handler for clicking a date
            curr_date.click({meals: meals, month: months[month], day:day}, date_click);
            row.append(curr_date);
        }
    }
    // Append the last row and set the current year
    calendar_days.append(row);
    $(".year").text(year);
}

// Get the number of days in a given month/year
function days_in_month(month, year) {
    var monthStart = new Date(year, month, 1);
    var monthEnd = new Date(year, month + 1, 1);
    return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);    
}

// meal handler for when a date is clicked
function date_click(meal) {
    $(".meals-container").show(250);
    $("#dialog").hide(250);
    $(".active-date").removeClass("active-date");
    $(this).addClass("active-date");
    show_meals(meal.data.meals, meal.data.month, meal.data.day);
};

// meal handler for when a month is clicked
function month_click(meal) {
    $(".meals-container").show(250);
    $("#dialog").hide(250);
    var date = meal.data.date;
    $(".active-month").removeClass("active-month");
    $(this).addClass("active-month");
    var new_month = $(".month").index(this);
    date.setMonth(new_month);
    init_calendar(date);
}

// meal handler for when the year right-button is clicked
function next_year(meal) {
    $("#dialog").hide(250);
    var date = meal.data.date;
    var new_year = date.getFullYear()+1;
    $("year").html(new_year);
    date.setFullYear(new_year);
    init_calendar(date);
}

// meal handler for when the year left-button is clicked
function prev_year(meal) {
    $("#dialog").hide(250);
    var date = meal.data.date;
    var new_year = date.getFullYear()-1;
    $("year").html(new_year);
    date.setFullYear(new_year);
    init_calendar(date);
}

// meal handler for clicking the new meal button
function new_meal(meal) {
    // if a date isn't selected then do nothing
    if($(".active-date").length===0)
        return;
    // remove red error input on click
    $("input").click(function(){
        $(this).removeClass("error-input");
    })
    // empty inputs and hide meals
    $("#dialog input[type=text]").val('');
    $('#radio-checks input').on('change', function() {$('input[name=flexRadioDefault]:checked', '#radio-checks').val();});
    $(".meals-container").hide(250);
    $("#dialog").show(250);
    // meal handler for cancel button
    $("#cancel-button").click(function() {
        $("#name").removeClass("error-input");
        $("#mealtime").removeClass("error-input");
        $("#dialog").hide(250);
        $(".meals-container").show(250);
    });
    // meal handler for ok button
    $("#ok-button").unbind().click({date: meal.data.date}, function() {
        var date = meal.data.date;
        var name = $("#name").val().trim();
        var radio = $('input[name=flexRadioDefault]');
        var mealtime = radio.filter(":checked").val();
        var day = parseInt($(".active-date").html());
        // Basic form validation
        if(name.length === 0) {
            $("#name").addClass("error-input");
        }
        else if(mealtime.length === 0) {
            $("#mealtime").addClass("error-input");
        }
        else {
            $("#dialog").hide(250);
            new_meal_json(name, mealtime, date, day);
            date.setDate(day);
            init_calendar(date);
        }
    });
}

// Adds a json meal to meal_data
function new_meal_json(name, mealtime, date, day) {
    var meal = {
        "meal": name,
        "mealtime": mealtime,
        "year": date.getFullYear(),
        "month": date.getMonth()+1,
        "day": day
    };
    meal_data["meals"].push(meal);
}

// Display all meals of the selected date in card views
function show_meals(meals, month, day) {
    // Clear the dates container
    $(".meals-container").empty();
    $(".meals-container").show(250);
    
    var meal_card = null;
    var meal_name = null;
    // If there are no meals for this date, notify the user
    if(meals.length===0) {
        meal_card = $("<div class='meal-card'></div>");
        meal_name = $("<div class='meal-name'>There are no meals prepped for "+month+" "+day+".</div>");
        $(meal_card).css({ "border-left": "10px solid #FF1744" });
        $(meal_card).append(meal_name);
        $(".meals-container").append(meal_card);
    }
    else {
        // Go through and add each meal as a card to the meals container
        for(var i=0; i<meals.length; i++) {
            meal_card = $("<div class='meal-card'></div>");
            var meal_mealtime = $("<div class='meal-mealtime'>"+meals[i]["mealtime"]+":</div>");
            meal_name = $("<div class='meal-name'>"+meals[i]["meal"]+" </div>");
            if(meals[i]["cancelled"]===true) {
                $(meal_card).css({
                    "border-left": "10px solid #FF1744"
                });
            }
            $(meal_card).append(meal_mealtime).append(meal_name);
            $(".meals-container").append(meal_card);
        }
    }
}

// Checks if a specific date has any meals
function check_meals(day, month, year) {
    var meals = [];
    for(var i=0; i<meal_data["meals"].length; i++) {
        var meal = meal_data["meals"][i];
        if(meal["day"]===day &&
            meal["month"]===month &&
            meal["year"]===year) {
                meals.push(meal);
            }
    }
    return meals;
}

// Given data for meals in JSON format
var meal_data = {
    "meals": [
    {
        "meal": " Spaghetti Bolognese ",
        "mealtime": "Lunch",
        "year": 2024,
        "month": 7,
        "day": 10,
        "cancelled": true
    },
    {
        "meal": " Lasagne ",
        "mealtime": "Breakfast",
        "year": 2024,
        "month": 6,
        "day": 7,
        "cancelled": true
    },
        {
        "meal": " Rice with Chicken ",
        "mealtime": "Dinner",
        "year": 2024,
        "month": 6,
        "day": 3,
        "cancelled": true
    },
    {
        "meal": " Sushi ",
        "mealtime": "Breakfast",
        "year": 2024,
        "month": 6,
        "day": 30
    },
        {
        "meal": " Burger ",
        "mealtime": "Dinner",
        "year": 2024,
        "month": 7,
        "day": 26,
        "cancelled": true
    },
    {
        "meal": " Spaghetti Bolognese ",
        "mealtime": "Dinner",
        "year": 2024,
        "month": 6,
        "day": 7
    },
        {
        "meal": " Pizza ",
        "mealtime": "Lunch",
        "year": 2024,
        "month": 7,
        "day": 15,
        "cancelled": true
    },
    {
        "meal": " Burger ",
        "mealtime": "Lunch",
        "year": 2024,
        "month": 5,
        "day": 10
    },
        {
        "meal": " Spaghetti Carbonara",
        "mealtime": "Breakfast",
        "year": 2024,
        "month": 6,
        "day": 10,
        "cancelled": true
    },
    {
        "meal": " Chicken Teriyaki ",
        "mealtime": "Dinner",
        "year": 2024,
        "month": 6,
        "day": 10
    },
    {
        "meal": " Spaghetti Carbonara",
        "mealtime": "Lunch",
        "year": 2024,
        "month": 7,
        "day": 11
    }
    ]
};

const months = [ 
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December" 
];

})(jQuery);
