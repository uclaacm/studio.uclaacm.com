export enum Axis {
  LHorizontal = 0,
  LVertical,
  RHorizontal,
  RVertical,
}

export enum Joystick {
  Left = 0,
  Right,
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
export const defaultAxisSmoothing = (threshold: number) => (value: number) =>
  Math.max(0, (Math.abs(value) - threshold) / (1 - threshold)) *
  Math.sign(value);
const defaultEpsilon = 0.001;

export type GamepadInputOptions = {
  axisSmoothing?: (value: number) => number;
  initialRepeatTime?: number;
  repeatTime?: number;
  epsilon?: number;
  invertY?: boolean;
};

export type GamepadEventType =
  | "gamepadbuttonpressed"
  | "gamepadbuttonreleased"
  | "gamepadbuttonrepeat"
  | "gamepadaxischange"
  | "gamepadjoystickchange";

export class GamepadButtonPressedEvent extends Event {
  constructor(public button: Button) {
    super("gamepadbuttonpressed");
  }
}

export class GamepadButtonReleasedEvent extends Event {
  constructor(public button: Button) {
    super("gamepadbuttonreleased");
  }
}

export class GamepadButtonRepeatEvent extends Event {
  constructor(public button: Button) {
    super("gamepadbuttonrepeat");
  }
}

export class GamepadAxisChangeEvent extends Event {
  constructor(
    public axis: Axis,
    public value: number,
  ) {
    super("gamepadaxischange");
  }
}

export class GamepadJoystickChangeEvent extends Event {
  public defined: boolean;
  public zero: boolean;
  public theta: number | undefined;
  public radius: number | undefined;
  constructor(
    public joystick: Joystick,
    public value: [number, number],
    epsilon: number,
  ) {
    super("gamepadjoystickchange");

    this.defined = typeof value[0] === "number" && typeof value[1] === "number";
    this.zero =
      this.defined &&
      Math.abs(value[0]) < epsilon &&
      Math.abs(value[1]) < epsilon;
    this.theta =
      this.defined && !this.zero ? Math.atan2(value[1], value[0]) : undefined;
    this.radius = this.defined
      ? this.zero
        ? 0
        : Math.sqrt(value[0] * value[0] + value[1] * value[1])
      : undefined;
  }
}

export class GamepadInput extends EventTarget {
  public axisSmoothing: (value: number) => number;
  public initialRepeatTime: number;
  public repeatTime: number;
  public epsilon: number;
  public invertY: boolean;

  private buttonPressedMap: Map<Button, boolean>;
  private buttonRepeatingMap: Map<Button, boolean> = new Map();
  private buttonRepeatTimeMap: Map<Button, number> = new Map();

  private axisMap: Map<Axis, number> = new Map();
  private joystickMap: Map<Joystick, [number | undefined, number | undefined]> =
    new Map([
      [Joystick.Left, [undefined, undefined]],
      [Joystick.Right, [undefined, undefined]],
    ]);

  constructor(
    public gamepad: Gamepad,
    options?: GamepadInputOptions,
  ) {
    super();
    this.axisSmoothing = options?.axisSmoothing ?? defaultAxisSmoothing(0.3);
    this.initialRepeatTime = options?.initialRepeatTime ?? 500;
    this.repeatTime = options?.repeatTime ?? 200;
    this.epsilon = options?.epsilon ?? defaultEpsilon;

    this.invertY = options?.invertY ?? false;

    this.buttonPressedMap = new Map(
      new Array(BUTTONS).fill(0).map((_, i) => [i as Button, false]),
    );
  }

  addEventListener(
    type: GamepadEventType,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    return super.addEventListener(type, callback, options);
  }

  update() {
    const time = new Date().getTime();
    this.gamepad.buttons.forEach((button, i) => {
      if (button.pressed) {
        if (this.buttonPressedMap.get(i) !== true) {
          this.buttonPressedMap.set(i, true);
          this.buttonRepeatingMap.set(i, false);
          this.buttonRepeatTimeMap.set(i, time);
          this.dispatchEvent(new GamepadButtonPressedEvent(i));
        } else {
          const repeatInterval = this.buttonRepeatingMap.get(i)
            ? this.repeatTime
            : this.initialRepeatTime;
          if (time > this.buttonRepeatTimeMap.get(i) + repeatInterval) {
            this.buttonRepeatTimeMap.set(i, time);
            this.buttonRepeatingMap.set(i, true);
            this.dispatchEvent(new GamepadButtonRepeatEvent(i));
          }
        }
      } else {
        if (this.buttonPressedMap.get(i) === true) {
          this.buttonPressedMap.set(i, false);
          this.buttonRepeatingMap.delete(i);
          this.buttonRepeatTimeMap.delete(i);
          this.dispatchEvent(new GamepadButtonReleasedEvent(i));
        }
      }
    });

    this.gamepad.axes.forEach((value, axis) => {
      const oldValue: number | undefined = this.axisMap.get(axis);
      const newValue = this.normalizeAxisValue(axis, this.axisSmoothing(value));
      this.axisMap.set(axis, newValue);
      if (
        typeof oldValue !== typeof newValue ||
        (oldValue !== undefined && Math.abs(oldValue - newValue) > this.epsilon)
      ) {
        this.dispatchEvent(new GamepadAxisChangeEvent(axis as Axis, newValue));
      }
    });

    ([Joystick.Left, Joystick.Right] as Joystick[]).forEach((joystick) => {
      const oldValue = this.joystickMap.get(joystick);
      const newValue: [number, number] = [
        this.axisMap.get(
          joystick === Joystick.Left ? Axis.LHorizontal : Axis.RHorizontal,
        ),
        this.axisMap.get(
          joystick === Joystick.Left ? Axis.LVertical : Axis.RVertical,
        ),
      ];
      this.joystickMap.set(joystick, newValue);
      if (
        typeof oldValue[0] !== typeof newValue[0] ||
        typeof oldValue[1] !== typeof newValue[1] ||
        Math.abs(oldValue[0] - newValue[0]) > this.epsilon ||
        Math.abs(oldValue[1] - newValue[1]) > this.epsilon
      ) {
        this.dispatchEvent(
          new GamepadJoystickChangeEvent(joystick, newValue, this.epsilon),
        );
      }
    });
  }

  getAxis(axis: Axis) {
    return this.normalizeAxisValue(
      axis,
      this.axisSmoothing(this.gamepad.axes[axis as number]),
    );
  }

  getButtonDown(button: Button) {
    return this.gamepad.buttons[button as number].pressed;
  }

  private normalizeAxisValue(axis: Axis, value: number) {
    return axis === Axis.LVertical || axis === Axis.RVertical
      ? this.normalizeYAxisValue(value)
      : value;
  }

  private normalizeYAxisValue(value: number) {
    return this.invertY ? value : -value;
  }
}
