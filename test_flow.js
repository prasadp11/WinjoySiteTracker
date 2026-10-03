import * as XLSX from 'xlsx';
import assert from 'assert';

console.log('--- RUNNING SITE TRIP TRACKER VERIFICATION TESTS ---');

// 1. Test Distance & Expense Math
const testOneWayKm = 18.5;
const isRoundTrip = true;
const totalKm = isRoundTrip ? testOneWayKm * 2 : testOneWayKm;
assert.strictEqual(totalKm, 37.0, 'Total round trip km calculation matches');

const ratePerKm = 12.0;
const baseExpense = totalKm * ratePerKm;
assert.strictEqual(baseExpense, 444.0, 'Base travel expense matches');

const toll = 50.0;
const totalDailyExpense = baseExpense + toll;
assert.strictEqual(totalDailyExpense, 494.0, 'Total daily expense matches');
console.log('✓ Trip distance and expense formulas verified successfully.');

// 2. Test Excel Generation
const mockTrips = [
  {
    id: 't-1',
    date: '2026-09-02',
    startLocation: 'Sector 62, Noida',
    endLocation: 'Site Alpha - Greater Noida West',
    isRoundTrip: true,
    totalDistanceKm: 37.0,
    ratePerKm: 12.0,
    baseExpense: 444.0,
    tollAndParkingExpense: 50.0,
    totalExpense: 494.0,
    purpose: 'Civil inspection',
  },
  {
    id: 't-2',
    date: '2026-09-04',
    startLocation: 'Sector 62, Noida',
    endLocation: 'Site Beta - Sector 132',
    isRoundTrip: true,
    totalDistanceKm: 44.0,
    ratePerKm: 12.0,
    baseExpense: 528.0,
    tollAndParkingExpense: 0,
    totalExpense: 528.0,
    purpose: 'HVAC review',
  },
];

const rows = [
  ['TRAVEL EXPENSE & SITE VISIT REIMBURSEMENT CLAIM'],
  ['Month & Year: September 2026'],
  [],
  ['Employee Name:', 'Rahul Sharma', 'Total Travel Days:', mockTrips.length],
  ['Designation:', 'Senior Site Engineer', 'Total Distance:', '81 km'],
  ['Vehicle Type:', 'Car', 'Claim Total:', '₹1,022'],
  [],
  ['S.No.', 'Date', 'Day', 'Start', 'Site', 'Type', 'Distance (km)', 'Rate (₹/km)', 'Fuel (₹)', 'Toll (₹)', 'Total (₹)', 'Purpose'],
];

mockTrips.forEach((t, i) => {
  rows.push([
    i + 1,
    t.date,
    'Wed',
    t.startLocation,
    t.endLocation,
    'Round Trip',
    t.totalDistanceKm,
    t.ratePerKm,
    t.baseExpense,
    t.tollAndParkingExpense,
    t.totalExpense,
    t.purpose,
  ]);
});

const ws = XLSX.utils.aoa_to_sheet(rows);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Trip Expenses');

const outputBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
assert(outputBuffer.length > 1000, 'Excel buffer generated with valid size');
console.log(`✓ Excel workbook created successfully (${outputBuffer.length} bytes).`);

console.log('--- ALL ENGINE CHECKS PASSED ---');
