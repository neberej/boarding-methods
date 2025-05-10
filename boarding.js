import config from './boarding.json';

const ROWS = config.ROWS; // Number of rows in the plane
const SEATS_PER_ROW = config.SEATS_PER_ROW; // Seats per row (A-F)
const SEAT_SIZE = config.SEAT_SIZE; // Size of each seat
const AISLE_WIDTH = config.AISLE_WIDTH; // Width of the aisle
const ROW_SPACING = config.ROW_SPACING; // Spacing between rows
const PASSENGER_SIZE = config.PASSENGER_SIZE; // Size of passengers
const ANIMATION_SPEED = config.ANIMATION_SPEED; // Movement speed

// Generate unique seats
function generateUniqueSeats(numPassengers) {
  const seats = []; // Unique seat assignments
  const taken = new Set(); // Set to track taken seats
  while (seats.length < numPassengers) {
    const row = Math.floor(Math.random() * ROWS);
    const seat = Math.floor(Math.random() * SEATS_PER_ROW); // random seats
    const key = `${row}-${seat}`; // unique key
    if (!taken.has(key)) {
      taken.add(key);
      seats.push({ row, seat });
    }
  }
  return seats;
}

// Create passenger data for a given boarding method
function createPassengerData(method) {
  const passengers = []; // Passenger objects

  const boardingMethods = {
    openSeating: () => {
      const seats = generateUniqueSeats(150);
      for (let group = 0; group < 3; group++) {
        const groupSeats = seats.slice(group * 50, (group + 1) * 50);
        groupSeats.forEach(({ row, seat }) => {
          const color = group === 0 ? '#ff0000' : group === 1 ? '#00ff00' : '#0000ff';
          passengers.push({
            startPos: [(Math.random() - 0.5) * AISLE_WIDTH, PASSENGER_SIZE, 2],
            targetRow: row,
            targetSeat: seat,
            color,
            startTime: group * 1000,
          });
        });
      }
    },

    // Back-to-Front
    backToFront: () => {
      const zones = [
        { rows: [20, 29], color: '#ff0000' },
        { rows: [10, 19], color: '#00ff00' },
        { rows: [0, 9], color: '#0000ff' },
      ];
      const seats = generateUniqueSeats(150);
      let seatIndex = 0;
      zones.forEach((zone, group) => {
        const groupSeats = seats.filter(({ row }) => row >= zone.rows[0] && row <= zone.rows[1]).slice(0, 50);
        groupSeats.forEach(({ row, seat }) => {
          passengers.push({
            startPos: [(Math.random() - 0.5) * AISLE_WIDTH, PASSENGER_SIZE, 2],
            targetRow: row,
            targetSeat: seat,
            color: zone.color,
            startTime: group * 1000,
          });
        });
        seatIndex += 50;
      });
    },

    // Window-middle-aisle
    windowMiddleAisle: () => {
      const groups = [
        { seats: [0, 5], color: '#ff0000' }, // Window
        { seats: [1, 4], color: '#00ff00' }, // Middle
        { seats: [2, 3], color: '#0000ff' }, // Aisle
      ];
      const seats = generateUniqueSeats(150);
      let seatIndex = 0;
      groups.forEach((group, groupIdx) => {
        const groupSeats = seats.filter(({ seat }) => group.seats.includes(seat)).slice(0, 50);
        groupSeats.forEach(({ row, seat }) => {
          passengers.push({
            startPos: [(Math.random() - 0.5) * AISLE_WIDTH, PASSENGER_SIZE, 2],
            targetRow: row,
            targetSeat: seat,
            color: group.color,
            startTime: groupIdx * 1000,
          });
        });
        seatIndex += 50;
      });
    },

    // Steffen
    steffen: () => {
      const groups = [
        { seats: [0, 5], rows: Array.from({ length: ROWS / 2 }, (_, i) => i * 2 + 1), color: '#ff0000' },
        { seats: [1, 4], rows: Array.from({ length: ROWS / 2 }, (_, i) => i * 2), color: '#00ff00' },
        { seats: [2, 3], rows: Array.from({ length: ROWS / 2 }, (_, i) => i * 2 + 1), color: '#0000ff' },
      ];
      const seats = generateUniqueSeats(150);
      let seatIndex = 0;
      groups.forEach((group, groupIdx) => {
        const groupSeats = seats.filter(({ row, seat }) => group.seats.includes(seat) && group.rows.includes(row)).slice(0, 50);
        groupSeats.forEach(({ row, seat }) => {
          passengers.push({
            startPos: [(Math.random() - 0.5) * AISLE_WIDTH, PASSENGER_SIZE, 2],
            targetRow: row,
            targetSeat: seat,
            color: group.color,
            startTime: groupIdx * 1000,
          });
        });
        seatIndex += 50;
      });
    },

    // Reverse pyramid
    reversePyramid: () => {
      const groups = [
        { seats: [0, 5], rows: [15, 29], color: '#ff0000' },
        { seats: [0, 5], rows: [0, 14], color: '#ff0000' },
        { seats: [1, 4], rows: [15, 29], color: '#00ff00' },
        { seats: [1, 4], rows: [0, 14], color: '#00ff00' },
        { seats: [2, 3], rows: [15, 29], color: '#0000ff' },
        { seats: [2, 3], rows: [0, 14], color: '#0000ff' },
      ];
      const seats = generateUniqueSeats(150);
      let seatIndex = 0;
      groups.forEach((group, groupIdx) => {
        const groupSeats = seats.filter(({ row, seat }) => group.seats.includes(seat) && row >= group.rows[0] && row <= group.rows[1]).slice(0, 25);
        groupSeats.forEach(({ row, seat }) => {
          passengers.push({
            startPos: [(Math.random() - 0.5) * AISLE_WIDTH, PASSENGER_SIZE, 2],
            targetRow: row,
            targetSeat: seat,
            color: group.color,
            startTime: groupIdx * 1000,
          });
        });
        seatIndex += 25;
      });
    },

    // Rotating Zone
    rotatingZone: () => {
      const zones = [
        { rows: [0, 4], color: '#ff0000' },
        { rows: [25, 29], color: '#ff0000' },
        { rows: [5, 9], color: '#00ff00' },
        { rows: [20, 24], color: '#00ff00' },
        { rows: [10, 14], color: '#0000ff' },
        { rows: [15, 19], color: '#0000ff' },
      ];
      const seats = generateUniqueSeats(150);
      let seatIndex = 0;
      zones.forEach((zone, groupIdx) => {
        const groupSeats = seats.filter(({ row }) => row >= zone.rows[0] && row <= zone.rows[1]).slice(0, 25);
        groupSeats.forEach(({ row, seat }) => {
          passengers.push({
            startPos: [(Math.random() - 0.5) * AISLE_WIDTH, PASSENGER_SIZE, 2],
            targetRow: row,
            targetSeat: seat,
            color: zone.color,
            startTime: groupIdx * 1000,
          });
        });
        seatIndex += 25;
      });
    },
  };

  boardingMethods[method]();
  return passengers;
}

export { createPassengerData, ROWS, SEATS_PER_ROW, SEAT_SIZE, AISLE_WIDTH, ROW_SPACING, PASSENGER_SIZE, ANIMATION_SPEED };
