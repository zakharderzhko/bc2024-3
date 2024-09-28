const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .option('-i, --input <path>', 'Path to input file (json)') 
  .option('-o, --output <path>', 'Path to output file') 
  .option('-d, --display', 'Display result in console'); 

program.parse(process.argv);
const options = program.opts(); 

if (!options.input) {
  console.error("Please, specify input file"); 
  process.exit(1); 
}

let data;
try {
  data = JSON.parse(fs.readFileSync(options.input, 'utf8')); 
} catch (error) {
  console.error("Cannot find input file");
  process.exit(1);
}

if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(data, null, 2)); 
}

if (options.display) {
  console.log(JSON.stringify(data, null, 2)); 
}

if (options.output && options.display) {
  fs.writeFileSync(options.output, JSON.stringify(data, null, 2)); 
  console.log(JSON.stringify(data, null, 2)); 
}

if (!options.output && !options.display) {
  process.exit(); 
}