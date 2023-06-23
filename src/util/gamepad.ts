export enum Axis {
	LHorizontal = 0,
	LVertical,
	RHorizontal,
	RVertical,
}

export enum XBoxButton {
	A = 0,
	B = 1,
	X = 2,
	Y = 3,
	LB = 4,
	RB = 5,
	LT = 6,
	RT = 7,
	Select = 8,
	Start = 9,
	LeftStick = 10,
	RightStick = 11,
	Up = 12,
	Down = 13,
	Left = 14,
	Right = 15,
}

export const BUTTONS = 16;

export type Button = XBoxButton | number;

// activates at threshold
// See: https://www.desmos.com/calculator/qxfe2ijhv7
export const defaultAxisSmoothing = (threshold: number) => (value: number) => Math.max(0, (Math.abs(value) - threshold)/(1 - threshold)) * Math.sign(value);

export type GamepadInputOptions = {
	axisSmoothing?: (value: number) => number,
	initialRepeatTime?: number,
	repeatTime?: number,
}

export type GamepadEventType = "gamepadbuttonpressed"
	| "gamepadbuttonreleased"
	| "gamepadbuttonrepeat";

export class GamepadButtonPressedEvent extends Event {
	constructor(public button: Button){
		super("gamepadbuttonpressed");
	}
}

export class GamepadButtonReleasedEvent extends Event {
	constructor(public button: Button){
		super("gamepadbuttonreleased");
	}
}

export class GamepadButtonRepeatEvent extends Event {
	constructor(public button: Button){
		super("gamepadbuttonrepeat");
	}
}

export class GamepadInput extends EventTarget {
	public axisSmoothing: (value: number) => number;
	public initialRepeatTime: number;
	public repeatTime: number;

	private buttonPressedMap: Map<Button, boolean>;
	private buttonRepeatingMap: Map<Button, boolean> = new Map();
	private buttonRepeatTimeMap: Map<Button, number> = new Map();

	constructor(public gamepad: Gamepad, options?: GamepadInputOptions) {
		super();
		this.axisSmoothing = options?.axisSmoothing ?? defaultAxisSmoothing(0.3);
		this.initialRepeatTime = options?.initialRepeatTime ?? 500;
		this.repeatTime = options?.repeatTime ?? 200;

		this.buttonPressedMap = new Map(new Array(BUTTONS).fill(0).map((_, i) => [i as Button, false]));
	}

	addEventListener(type: GamepadEventType, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
		return super.addEventListener(type, callback, options);
	}

	update(){
		const time = new Date().getTime();
		for(let i = 0; i < this.gamepad.buttons.length; ++i){
			const button = this.gamepad.buttons[i];
			if(button.pressed){
				if(this.buttonPressedMap.get(i) !== true){
					this.buttonPressedMap.set(i, true);
					this.buttonRepeatingMap.set(i, false);
					this.buttonRepeatTimeMap.set(i, time);
					this.dispatchEvent(new GamepadButtonPressedEvent(i));
				}
				else {
					const repeatInterval = this.buttonRepeatingMap.get(i) ? this.repeatTime : this.initialRepeatTime;
					if(time > this.buttonRepeatTimeMap.get(i) + repeatInterval){
						this.buttonRepeatTimeMap.set(i, time);
						this.buttonRepeatingMap.set(i, true);
						this.dispatchEvent(new GamepadButtonRepeatEvent(i));
					}
				}
			}
			else{
				if(this.buttonPressedMap.get(i) === true){
					this.buttonPressedMap.set(i, false);
					this.buttonRepeatingMap.delete(i);
					this.buttonRepeatTimeMap.delete(i);
					this.dispatchEvent(new GamepadButtonReleasedEvent(i));
				}
			}
		}
	}

	getAxis(axis: Axis){
		return this.axisSmoothing(this.gamepad.axes[axis as number])
	}

	getButtonDown(button: Button){
		return this.gamepad.buttons[button as number].pressed;
	}
}