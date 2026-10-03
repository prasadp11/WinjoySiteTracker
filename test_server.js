import * as XLSX from 'xlsx';

async function testBackend() {
  console.log('Testing /api/health...');
  try {
    const healthRes = await fetch('http://localhost:5001/api/health');
    const healthData = await healthRes.json();
    console.log('✓ Health response:', healthData);

    console.log('Testing /api/send-report with mock claim...');
    // Create a dummy workbook and base64
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([['Site Travel Test Claim'], ['September 2026']]);
    XLSX.utils.book_append_sheet(wb, ws, 'Claim');
    const base64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

    const reportRes = await fetch('http://localhost:5001/api/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipientEmail: 'accounts@company.com',
        employeeName: 'Rahul Sharma',
        employeeEmail: 'rahul@example.com',
        monthName: 'September 2026',
        totalDistance: '81.0',
        totalAmount: 1022,
        tripCount: 2,
        filename: 'Test_Claim_September_2026.xlsx',
        excelBase64: base64,
        customNote: 'Verification test for email dispatch',
      }),
    });

    const reportData = await reportRes.json();
    console.log('✓ Report dispatch response:', reportData);
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

testBackend();
