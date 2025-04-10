import fs from "fs";
import path from "path";
import sharp from "sharp";
import glob from "fast-glob";

let recreate = false;
let directory = "./public/images";

function printHelp(){
	console.log("Usage: node optimize-static-images.js [options]");
	console.log("Note: this only optimizes .jpeg, .jpg, and .png images");
	console.log("Options:");
	console.log("\t--recreate, -r\tRecreate the optimized images");
	console.log("\t--directory, -d DIR\tSpecify the directory containing images (default: ./public/images)");
}

const processedArgs = process.argv.slice(2).flatMap(
	arg => {
		if(arg.startsWith("-") && !arg.startsWith("--")){
			if(arg.length >= 2){
				return arg.slice(1).split("").map(c => "-" + c);
			} else {
				console.error("Could not parse args");
				printHelp();
				process.exit(1);
			}
		}
		return arg;
	}
)

for(let i = 0; i < processedArgs.length; i++){
	let arg = processedArgs[i];
	if(arg === "--help" || arg === "-h"){
		printHelp();
		process.exit(0);
	} else if(arg === "--recreate" || arg === "-r"){
		recreate = true;
	} else if (arg === "--directory" || arg === "-d"){
		i++;
		if(i >= process.argv.length){
			console.error("Error: Missing directory argument after --directory");
			printHelp();
			process.exit(1);
		}
		directory = processedArgs[i];
	}
}

// check if directory exists
if (!fs.existsSync(directory) || !fs.lstatSync(directory).isDirectory()) {
	console.error(`Error: Directory ${directory} does not exist`);
	process.exit(1);
}

console.log(`Optimizing images with in directory ${directory}...`);


const imageFiles = glob.sync(
	"**/*.{jpg,jpeg,png}",
	{
		cwd: directory,
	}
);

/** @type {sharp.SharpOptions} */
const sharpOptions = {
	autoOrient: true,

}

Promise.all(imageFiles.map((file) => {
	const input = path.join(directory, file);
	const out = path.join(
		directory,
		path.dirname(file),
		path.basename(file, path.extname(file)) + ".webp"
	);
	if (fs.existsSync(out) && !recreate) {
		console.log(`Skipping ${input}, already exists`);
		return Promise.resolve();
	}
	console.log(`Processing ${input}->${out}...`);
	return sharp(input, sharpOptions)
		.toFile(out)
		.then(() => {
			console.log(`Finished ${input}->${out}...`);
		});
})).catch((err) => {
	console.error("Error processing images:", err);
});