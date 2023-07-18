import { Bridge } from "@tinacms/datalayer"

export class LocalBridge implements Bridge {
	rootPath: string;
	constructor(rootPath: string){
		this.rootPath = rootPath
	}

	glob(pattern: string, extension: string): Promise<string[]> {
		throw new Error("Method not implemented.");
	}
	delete(filepath: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	get(filepath: string): Promise<string> {
		throw new Error("Method not implemented.");
	}
	put(filepath: string, data: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	outputPath?: string;

}