var data = require("./data")

console.log(data)

class logic{

    async getPets(){
        return new Promise((resolve, _)=>resolve(data));
    };

    async deletePet(id) {
        return new Promise((resolve, reject) => {
            let pet = data.find((pet) => pet.id === parseInt(id));
            if (!pet) {
                reject(`Invalid pet id value`);
            }
            resolve(`Pet deleted succesfully`);
        });
    }

    async getPet(id) {
        return new Promise((resolve, reject) => {

            let pet = data.find((pet) => pet.id === parseInt(id));
            if (pet) {
                resolve(pet);
            } else {
                reject(`Pet not found `);
            }
        });
    }

    async updatePet(id) {
        return new Promise((resolve, reject) => {
            let pet = data.find((pet) => pet.id === parseInt(id));
            if (!pet) {
                reject(`No pet found`);
            }
            //update code here 
            resolve(pet);
        });
    }
    async createPet(pet) {
        return new Promise((resolve, _) => {
            let newPet = {
                id: Math.floor(4 + Math.random() * 10),
                ...pet,
            };
            resolve(newPet);
        });
    }

}


module.exports = logic;