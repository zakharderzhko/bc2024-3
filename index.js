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

const neededData = data.filter(item => item.parent === "BS3_BanksLiab");
const result = neededData.map(item => `${item.txten}: ${item.value}`).join('\n');

if (options.output) {
  fs.writeFileSync(options.output, result); 
}

if (options.display) {
  console.log(result); 
}

if (options.output && options.display) {
  fs.writeFileSync(options.output, result); 
  console.log(result); 
}

if (!options.output && !options.display) {
  process.exit(); 
}