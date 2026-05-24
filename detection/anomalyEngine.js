const SimEvent = require('../models/SimEvent');

const analyzeEvent = (eventData) => {
  let riskScore = 0;
  const reasons = [];

  // Rule 1: SIM card change detected
  if (eventData.eventType === 'sim_change') {
    riskScore += 40;
    reasons.push('SIM card change detected');
  }

  // Rule 2: Login from a new/unknown device
  if (eventData.eventType === 'new_device_login') {
    riskScore += 30;
    reasons.push('Login from new device');
  }

  // Rule 3: Multiple OTP failures
  if (eventData.eventType === 'otp_failure') {
    riskScore += 20;
    reasons.push('Multiple OTP failures detected');
  }

  // Rule 4: Login from unusual location
  if (eventData.eventType === 'location_anomaly') {
    riskScore += 25;
    reasons.push('Login from unusual location');
  }

  // Rule 5: New device + SIM change together = very high risk
  if (eventData.eventType === 'sim_change' && eventData.newDevice) {
    riskScore += 30;
    reasons.push('SIM change combined with new device — critical risk');
  }

  const flagged = riskScore >= 40;

  return { riskScore, reasons, flagged };
};

module.exports = { analyzeEvent };