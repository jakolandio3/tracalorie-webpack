import Storage from './Storage';

class CalorieTracker {
	constructor() {
		this._calorieLimit = Storage.getCalorieLimit();
		this._totalCalories = Storage.getTotalCalories();
		this._meals = Storage.getMeals();
		this._workouts = Storage.getWorkouts();
		// running functions when you create a calorie tracker
		this._displayCaloriesTotal();
		this._displayCalorieLimit();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCalorieProgress();

		document.getElementById('limit').value = this._calorieLimit;
	}
	//public methods/API//
	addMeal(meal) {
		//add meal function
		this._meals.push(meal); //adding the new meal to meal list
		this._totalCalories += meal.calories; // total calories plus the calories from the meal
		Storage.setTotalCalories(this._totalCalories);
		Storage.saveMeal(meal);
		this._displayNewMeal(meal); // adding the meal to the dom here

		this._render(); //calling the render function here
	}
	addWorkout(workout) {
		//add workout function
		this._workouts.push(workout); //adding the new workout to workout list
		this._displayNewWorkout(workout); //displaying workout onto the dom
		this._totalCalories -= workout.calories; // total calories minus the calories from the workout
		Storage.setTotalCalories(this._totalCalories);
		Storage.saveWorkout(workout);
		this._render(); //calling the render function here
	}
	// removing meal and workouts
	removeMeal(id) {
		const index = this._meals.findIndex((meal) => meal.id === id); // finding the right match we called for
		if (index != -1) {
			//checking it exists
			const meal = this._meals[index];
			this._totalCalories -= meal.calories; //taking out of the calories
			Storage.setTotalCalories(this._totalCalories);
			this._meals.splice(index, 1); //take the meal out of the array
			Storage.removeMeal(id);
			this._render(); // all the refreshing data
		}
	}
	removeWorkout(id) {
		const index = this._workouts.findIndex((workout) => workout.id === id); // finding the right match we called for
		if (index != -1) {
			//checking it exists
			const workout = this._workouts[index];
			this._totalCalories += workout.calories;
			Storage.setTotalCalories(this._totalCalories);
			this._workouts.splice(index, 1);
			Storage.removeWorkout(id);
			this._render();
		}
	}
	// resetting the day / removing all values
	reset() {
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];
		this._render();
		Storage.clearAll();
	}
	// set limit for calories
	setLimit(calorieLimit) {
		this._calorieLimit = calorieLimit;
		Storage.setCalorieLimit(calorieLimit);
		this._displayCalorieLimit();
		this._render();
	}
	// load items
	loadItems() {
		this._meals.forEach((meal) => this._displayNewMeal(meal)); // its saying for each meal in the array of meals (populated by storage) run the function of display new meal
		this._workouts.forEach((workout) => this._displayNewWorkout(workout));
	}

	//private methods//
	//displaying total calories dynamically
	_displayCaloriesTotal() {
		const totalCaloriesEl = document.getElementById('calories-total');
		totalCaloriesEl.innerHTML = this._totalCalories;
	}
	//displaying total calorie limit dynamically
	_displayCalorieLimit() {
		const totalCaloriesEl = document.getElementById('calories-limit');
		totalCaloriesEl.innerHTML = this._calorieLimit;
	}
	//calories consumed or burned functions
	_displayCaloriesConsumed() {
		const caloriesConsumedEl = document.getElementById('calories-consumed');
		//adding all the calories within the array together using high order function reduce
		const consumed = this._meals.reduce(
			(total, meal) => total + meal.calories,
			0
		);
		caloriesConsumedEl.innerHTML = consumed;
	}
	_displayCaloriesBurned() {
		//calories burned basically same as calories consumed
		const caloriesBurnedEl = document.getElementById('calories-burned');
		//adding all the calories within the array together using high order function reduce
		const burned = this._workouts.reduce(
			(total, workout) => total + workout.calories,
			0
		);
		caloriesBurnedEl.innerHTML = burned;
	}
	// CALORIES REAMINING
	_displayCaloriesRemaining() {
		const progressBarEl = document.getElementById('calorie-progress');
		const caloriesRemainingEl = document.getElementById('calories-remaining');
		const remaining = this._calorieLimit - this._totalCalories;
		caloriesRemainingEl.innerHTML = remaining;
		// adding class to parent, parent element to toggle background if the calories are in negative
		if (remaining <= 0) {
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				'bg-light'
			);
			caloriesRemainingEl.parentElement.parentElement.classList.add(
				'bg-danger'
			);
			// adding red background to progressbar if full
			progressBarEl.classList.remove('bg-success');
			progressBarEl.classList.add('bg-danger');
		} else {
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				'bg-danger'
			);
			caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
			progressBarEl.classList.remove('bg-danger');
			progressBarEl.classList.add('bg-success');
		}
	}
	//display calorie progress bar (this is using bootstrap framework properties)
	_displayCalorieProgress() {
		const progressBarEl = document.getElementById('calorie-progress');
		const percentage = (this._totalCalories / this._calorieLimit) * 100;
		const width = Math.min(percentage, 100);
		progressBarEl.style.width = `${width}%`;
	}
	// displaying functions to the dom
	// display newe meaaaal
	_displayNewMeal(meal) {
		const mealsEl = document.getElementById('meal-items');
		const mealEl = document.createElement('div');
		mealEl.classList.add('card', 'my-2');
		mealEl.setAttribute('data-id', meal.id);
		mealEl.innerHTML = ` <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
		mealsEl.appendChild(mealEl);
	}
	_displayNewWorkout(workout) {
		const workoutsEl = document.getElementById('workout-items');
		const workoutEl = document.createElement('div');
		workoutEl.classList.add('card', 'my-2');
		workoutEl.setAttribute('data-id', workout.id);
		workoutEl.innerHTML = ` <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
		workoutsEl.appendChild(workoutEl);
	}

	//setting up a reactive render method to call functions after adding meals and workouts etc.
	_render() {
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCalorieProgress();
	}
}

export default CalorieTracker;
