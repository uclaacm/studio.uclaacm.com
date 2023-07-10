const { exec } = require("child_process");

exec(
	`openssl req -x509 ` +
	`-config ./openssl_conf ` +
	`-out certificates/localhost2.crt -keyout certificates/localhost2.key ` +
	`-days 365 -newkey rsa:2048 -nodes -sha256 `,
	(error, stdout, stderr) => {
		if (error) {
			console.error("Could not generate certificates.");
			if(error) console.error(`exception message: ${error.message}`);
			if(stderr) console.error(`stderr: ${stderr}`);
			return;
		}

		if(stderr) console.log(`stderr:\n${stderr}`);
		if(stdout) console.log(`stdout:\n${stdout}`);

		console.log("Generated certificates successfully.");
	}
);