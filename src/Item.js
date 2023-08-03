class Meal {
	//making the class of meal
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2); //random number generator with first 2 numbers eleminated to get rid of the 0 and the .
		this.name = name; //name thats passed in
		this.calories = calories; //calories that are passed in
	}
}
class Workout {
	//making the class of workout
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2); //random number generator with first 2 numbers eleminated to get rid of the 0 and the .
		this.name = name; //name thats passed in
		this.calories = calories; //calories that are passed in
	}
}

export { Meal, Workout };
