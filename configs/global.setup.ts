import 'dotenv/config';
import { rimrafSync } from 'rimraf';

async function globalSetup(): Promise<void> {
  rimrafSync('./allure-reports');
  rimrafSync('./allure-results/');
  rimrafSync('./output');
  console.log('Start Testing', new Date().toLocaleString());
}
export default globalSetup;
