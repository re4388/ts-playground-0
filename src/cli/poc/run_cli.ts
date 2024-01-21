import { spawn } from 'child_process';

const command = 'lsof';
const args = ['-iTCP', '-sTCP:LISTEN'];

// Spawn the child process
const childProcess = spawn(command, args);

childProcess.stdout?.on('data', (data: Buffer) => {
  const output = data.toString();
  console.log("------->output: ", output);

  // Process each line in the output
  const lines = output.split('\n');
  for (const line of lines) {
    let a1 = line.split(' ')
    console.log("------->a1: ", a1[0], a1[1], a1[16], a1[17], a1[18]);
    // console.log(`Output: ${line}`);
  }
});

// Attach listeners for errors and process completion
childProcess.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

childProcess.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
