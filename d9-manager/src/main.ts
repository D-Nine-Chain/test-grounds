#!/usr/bin/env -S deno run --allow-all

import { Command } from '@cliffy/command';
import { Select, Confirm } from '@cliffy/prompt';
import { colors } from '@cliffy/ansi';
import { getMessage } from './i18n.ts';
import { Messages } from './types.ts';
import { checkSystemRequirements, createProgressBar } from './utils/system.ts';
import { hasValidKeystore, getNodeAddress } from './utils/keystore.ts';
import { getD9API, disconnectD9API } from './utils/polkadot.ts';
import { checkBalanceWithPrompt, formatBalance } from './utils/balance.ts';
import { setupNode } from './commands/setup.ts';
import { submitCandidacy } from './commands/candidacy.ts';
import { convertNode } from './commands/convert.ts';

async function main() {
  console.clear();
  
  // Language selection
  const language = await Select.prompt({
    message: 'Choose your language / 选择您的语言:',
    options: [
      { name: 'English', value: 'en' },
      { name: '中文', value: 'zh' }
    ]
  });

  const messages = getMessage(language as 'en' | 'zh');
  
  console.clear();
  console.log(colors.blue.bold(messages.welcome));
  console.log('═'.repeat(50));
  
  // Check system and D9 binary
  console.log(messages.checkingBinary);
  await createProgressBar(2000, '');
  
  const systemInfo = await checkSystemRequirements();
  
  if (!systemInfo.hasD9Binary) {
    console.log(`\n⚠️  ${messages.binaryNotFound}`);
    const install = await Confirm.prompt('Install D9 node?');
    if (install) {
      await setupNode(messages);
      return;
    } else {
      console.log('❌ D9 node binary is required. Exiting.');
      return;
    }
  }
  
  console.log(`✅ D9 binary found at: ${systemInfo.binaryPath}`);
  
  // Check keystore access
  const keyAccess = await Confirm.prompt(messages.keyAccessPrompt);
  if (!keyAccess) {
    console.log('❌ Keystore access is required for most operations. Exiting.');
    return;
  }
  
  const hasKeys = await hasValidKeystore();
  if (!hasKeys) {
    console.log(`⚠️  ${messages.errors.keyNotFound}`);
    const setupNew = await Confirm.prompt('Setup new node with keys?');
    if (setupNew) {
      await setupNode(messages);
      return;
    } else {
      console.log('❌ Valid keystore is required. Exiting.');
      return;
    }
  }
  
  // Get node address and check balance
  const nodeAddress = await getNodeAddress();
  if (nodeAddress) {
    console.log(`\n🔗 Node Address: ${nodeAddress}`);
    
    try {
      await createProgressBar(1500, messages.checkingBalance);
      await checkBalanceWithPrompt(nodeAddress);
    } catch (error) {
      console.log(`⚠️  Could not check balance: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // Main menu loop
  let continueLoop = true;
  while (continueLoop) {
    console.log(`\n${messages.mainMenu}`);
    
    const action = await Select.prompt({
      message: 'Select an option:',
      options: [
        { name: '🚀 ' + messages.setupNewNode, value: 'setup' },
        { name: '🗳️  ' + messages.submitCandidacy, value: 'candidacy' },
        { name: '🔄 ' + messages.convertNode, value: 'convert' },
        { name: '📊 Check node status', value: 'status' },
        { name: '🚪 Exit', value: 'exit' }
      ]
    });
    
    try {
      switch (action) {
        case 'setup':
          await setupNode(messages);
          break;
        case 'candidacy':
          await submitCandidacy(messages);
          break;
        case 'convert':
          await convertNode(messages);
          break;
        case 'status':
          await showNodeStatus();
          break;
        case 'exit':
          continueLoop = false;
          break;
      }
    } catch (error) {
      console.log(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    if (continueLoop && action !== 'exit') {
      const continueProm = await Confirm.prompt('\nReturn to main menu?');
      if (!continueProm) {
        continueLoop = false;
      }
      console.clear();
      console.log(colors.blue.bold(messages.welcome));
      console.log('═'.repeat(50));
    }
  }
  
  // Disconnect API before exiting
  await disconnectD9API();
  console.log('\n👋 Goodbye!');
}

async function showNodeStatus(): Promise<void> {
  console.log('\n📊 Node Status');
  console.log('─'.repeat(30));
  
  try {
    // Check if service is running
    const statusProcess = new Deno.Command('sudo', { 
      args: ['systemctl', 'is-active', 'd9-node.service']
    });
    const statusResult = await statusProcess.output();
    const isActive = new TextDecoder().decode(statusResult.stdout).trim() === 'active';
    
    console.log(`Service Status: ${isActive ? '✅ Running' : '❌ Stopped'}`);
    
    if (isActive) {
      // Get recent logs
      const logsProcess = new Deno.Command('sudo', {
        args: ['journalctl', '-u', 'd9-node.service', '-n', '5', '--no-pager']
      });
      const logsResult = await logsProcess.output();
      const logs = new TextDecoder().decode(logsResult.stdout);
      
      console.log('\n📝 Recent Logs:');
      console.log('─'.repeat(20));
      console.log(logs);
    }
    
    // Show disk usage
    const dfProcess = new Deno.Command('df', { args: ['-h', '/home/ubuntu/node-data'] });
    const dfResult = await dfProcess.output();
    if (dfResult.code === 0) {
      const diskInfo = new TextDecoder().decode(dfResult.stdout);
      console.log('\n💾 Disk Usage:');
      console.log('─'.repeat(15));
      console.log(diskInfo);
    }
    
  } catch (error) {
    console.log(`❌ Error checking status: ${error instanceof Error ? error.message : String(error)}`);
  }
  
  console.log('\n💡 Useful commands:');
  console.log('  View logs: journalctl -u d9-node.service -f');
  console.log('  Stop node: sudo systemctl stop d9-node.service');
  console.log('  Start node: sudo systemctl start d9-node.service');
  console.log('  Restart: sudo systemctl restart d9-node.service');
}


// CLI definition for potential future use
const cli = new Command()
  .name('d9-manager')
  .version('1.0.0')
  .description('D9 Node Management Tool')
  .action(main);

if (import.meta.main) {
  await main();
}