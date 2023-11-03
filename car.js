class Vehicle{
    constructor (make,model,year){
    this.make= make
    this.model= model 
    this.year= year
    }

honk(){

    return "Beep";
    }

toString(){

    return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
}
};

class Car extends Vehicle{
    numWheels = 4;
};

class Motorcycle extends Vehicle{
    revEngine(){
        return "VROOM!!"
    }
    numWheels =2;

}

class Garage {
    constructor(capacity) {
        this.vehicles = [];
        this.capacity = capacity;
    }

    add(vehicle) {
        if (vehicle instanceof Vehicle) {
            if (this.vehicles.length < this.capacity) {
                this.vehicles.push(vehicle);
                return "Vehicle added!";
            } else {
                return "Sorry, we're full.";
            }
        } else {
            return "Only vehicles are allowed in here!";
        }
    }
}




let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
myFirstVehicle.honk(); // "Beep."

let myFirstCar = new Car("Toyota", "Corolla", 2005);
myFirstCar.toString(); // "The vehicle is a Toyota Corolla from 2005."
myFirstCar.honk();     // "Beep."
myFirstCar.numWheels;  // 4

let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);

myFirstMotorcycle.toString();
// "The vehicle is a Honda Nighthawk from 2000."

myFirstMotorcycle.honk();     // "Beep."
myFirstMotorcycle.revEngine(); // "VROOM!!!"
myFirstMotorcycle.numWheels;  // 2

let garage = new Garage(2);
garage.vehicles; // []
garage.add(new Car("Hyundai", "Elantra", 2015)); // "Vehicle added!"
garage.vehicles; // [Car]
garage.add("Taco"); // "Only vehicles are allowed in here!"

garage.add(new Motorcycle("Honda", "Nighthawk", 2000));
// "Vehicle added!"
garage.vehicles; // [Car, Motorcycle]

garage.add(new Motorcycle("Honda", "Nighthawk", 2001));
// "Sorry, we're full."