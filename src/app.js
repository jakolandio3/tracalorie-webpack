import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';

import './css/bootstrap.css';
import './css/style.css';

class App {
	constructor() {
		this._tracker = new CalorieTracker();
		this._loadEventListeners();
		// loading items in storage
		this._tracker.loadItems();
	}
	// event listeners
	_loadEventListeners() {
		// event listeners
		document
			.getElementById('meal-form')
			.addEventListener('submit', this._newItem.bind(this, 'meal'));
		document
			.getElementById('workout-form')
			.addEventListener('submit', this._newItem.bind(this, 'workout'));
		// remove items
		document
			.getElementById('workout-items')
			.addEventListener('click', this._removeItem.bind(this, 'workout'));
		document
			.getElementById('meal-items')
			.addEventListener('click', this._removeItem.bind(this, 'meal'));

		// filtering sections
		document
			.getElementById('filter-meals')
			.addEventListener('keyup', this._filterItems.bind(this, 'meal'));
		document
			.getElementById('filter-workouts')
			.addEventListener('keyup', this._filterItems.bind(this, 'workout'));
		// reseting items
		document
			.getElementById('reset')
			.addEventListener('click', this._reset.bind(this));
		//setting Calorie limit
		document
			.getElementById('limit-form')
			.addEventListener('submit', this._setLimit.bind(this));
	}

	_newItem(type, e) {
		e.preventDefault();
		const name = document.getElementById(`${type}-name`);
		const calories = document.getElementById(`${type}-calories`);
		//validate input
		if (name.value == '' || calories.value === '') {
			alert('Please fill in all fields');
			return;
		}
		if (type === 'meal') {
			const meal = new Meal(name.value, +calories.value);

			this._tracker.addMeal(meal);
		} else {
			const workout = new Workout(name.value, +calories.value);

			this._tracker.addWorkout(workout);
		}

		name.value = '';
		calories.value = '';

		const collapseItem = document.getElementById(`collapse-${type}`);
		const bsCollapse = new Collapse(collapseItem, {
			toggle: true,
		});
	}

	// remove Item
	_removeItem(type, e) {
		if (
			e.target.classList.contains('delete') ||
			e.target.classList.contains('fa-xmark')
		) {
			if (confirm('Are you sure?')) {
				const id = e.target.closest('.card').getAttribute('data-id');
				type === 'meal'
					? this._tracker.removeMeal(id)
					: this._tracker.removeWorkout(id);

				e.target.closest('.card').remove();
			}
		}
	}
	// filerting items
	_filterItems(type, e) {
		const text = e.target.value.toLowerCase();
		document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
			const name = item.firstElementChild.firstElementChild.textContent;
			if (name.toLowerCase().indexOf(text) !== -1) {
				//checking to make sure its a match by seing that name has the same characters as typed into text
				item.style.display = 'block';
			} else {
				item.style.display = 'none';
			}
		});
	}
	// reset items
	_reset() {
		this._tracker.reset();
		document.getElementById('meal-items').innerHTML = '';
		document.getElementById('workout-items').innerHTML = '';
		document.getElementById('filter-meals').value = '';
		document.getElementById('filter-workouts').value = '';
	}

	// setting Limit for calories
	_setLimit(e) {
		e.preventDefault();

		const limit = document.getElementById('limit');
		if (limit.value === '') {
			alert('Please add a limit');
			return;
		}
		this._tracker.setLimit(+limit.value);
		limit.value = '';
		// collapse the modal
		const modalEl = document.getElementById('limit-modal');
		const modal = Modal.getInstance(modalEl);
		modal.hide();
	}
}
const app = new App();
