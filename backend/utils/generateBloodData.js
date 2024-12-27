const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const donationTeams = [
  "Children Society of Moratuwa",
  "Red Cross Society of Colombo",
  "Lions Club of Kandy",
  "Rotary Club of Galle",
  "Youth Association of Jaffna",
  "Community Care of Anuradhapura",
  "Helping Hands of Batticaloa",
  "Goodwill Group of Negombo"
];

const requestTeams = [
  "National Hospital of Colombo",
  "Teaching Hospital of Kandy",
  "General Hospital of Galle",
  "District Hospital of Jaffna",
  "Base Hospital of Anuradhapura",
  "Provincial Hospital of Batticaloa",
  "Teaching Hospital of Peradeniya",
  "District Hospital of Matara"
];

const getRandomQuantity = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomStatus = () => (Math.random() > 0.5 ? "donate" : "request");

const startDate = new Date("2024-12-20");
const endDate = new Date("2025-02-28");

const data = [];

for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
  bloodTypes.forEach((bloodType) => {
    const status = getRandomStatus();
    const teamName = status === "donate" 
      ? donationTeams[Math.floor(Math.random() * donationTeams.length)] 
      : requestTeams[Math.floor(Math.random() * requestTeams.length)];

    data.push({
      _id: uuidv4(),
      teamName,
      date: new Date(date),
      bloodType,
      quantity: getRandomQuantity(1, 10),
      status,
      __v: 0,
    });
  });
}

fs.writeFileSync('bloodData.json', JSON.stringify(data, null, 2));

console.log('Data generated and saved to bloodData.json');


// node utils/generateBloodData.js
