#!/usr/bin/env node

const read = require('readline-sync');

const GOAL = 10000;
const startingXEM = read.question('How much XEM is in your wallet?\n');
let vested = read.question('What is your current vested balance?\n');
let daily = read.question('How much XEM will you add each day? (Enter 0 for none)\n')

vested = parseFloat(vested) ? parseFloat(vested) : 0;
daily = parseFloat(daily) ? parseFloat(daily) : 0;

let days = 0;
let unvested = parseFloat(startingXEM) ? parseFloat(startingXEM) : 0;
let totalXEM = unvested;

while (vested < GOAL) {
  totalXEM += daily;
  unvested += daily;
  const todaysVest = unvested * 0.10;
  unvested -= todaysVest;
  vested += todaysVest;
  days++;
  if (unvested <= 1) break;
}

if (vested >= GOAL) {
  console.log("You will have 10,000 vested XEM in " + days + " days");
} else {
  console.log("Total Vested: " + vested);
  console.log("Total XEM Balance: " + totalXEM);
  console.log("You ran out of vesting power at " + days + " days and need to add more each day");
}
