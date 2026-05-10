import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { execSync } from 'child_process';

/**
 * SHADOW SENTINEL v1.0
 * Bridges Shadow Core signals to the Telegram Gateway
 */

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const ALERT_THRESHOLD = 15.0; // Magnitude required for Telegram alert
const HERMES_PATH = 'C:\\Users\\booboo\\AppData\\Local\\hermes\\hermes-agent\\venv\\Scripts\\hermes.exe';

async function sentinelWatch() {
  console.log('--- SHADOW SENTINEL: WATCHDOG ACTIVE ---');
  console.log(`THRESHOLD: ${ALERT_THRESHOLD}x`);

  setInterval(() => {
    // Simulating the high-fidelity scan for the experiment
    const magnitude = (Math.random() * 25).toFixed(2);
    const magFloat = parseFloat(magnitude);

    console.log(`[WATCH] CURRENT MAGNITUDE: ${magnitude}x`);

    if (magFloat >= ALERT_THRESHOLD) {
      console.log(`[SENTINEL] !!! ALERT THRESHOLD BREACHED !!!`);
      
      const message = `🚨 SENTINEL ALERT: Anomalous Liquidity Detected! MAGNITUDE: ${magnitude}x. Ingesting further data...`;
      
      try {
        // Execute Hermes command to send the signal to Telegram
        execSync(`"${HERMES_PATH}" say "${message}"`, { stdio: 'inherit' });
        console.log(`[SENTINEL] Alert pushed to Mobile Command Center.`);
      } catch (error) {
        console.error(`[ERROR] Failed to push alert to Hermes:`, error);
      }
    }
  }, 10000); // Check every 10 seconds for the experiment
}

sentinelWatch().catch(console.error);
