import * as React from "react";

import { GamepadInput } from "~/util/gamepad";

const InputContext = React.createContext<GamepadInput>(null);

export type InputProviderProps = {
	children?: React.ReactNode;
}

export function InputProvider({children}: InputProviderProps){
	const [input, setInput] = React.useState<GamepadInput | null>(null);

	let animationFrame: number | null = null;

	React.useEffect(() => {
		window.addEventListener("gamepadconnected", onGamepadConnected);
		if(!input){
			const gamepads = navigator.getGamepads().filter(g => g);
			if(gamepads.length > 0){
				setInput(new GamepadInput(gamepads[0]));
			}
		}
		if(input){
			if(animationFrame) cancelAnimationFrame(animationFrame);
			animationFrame = requestAnimationFrame(gamepadLoop);
		}
		return () => {
			window.removeEventListener("gamepadconnected", onGamepadConnected);
			if(animationFrame) cancelAnimationFrame(animationFrame);
		}
	});

	function onGamepadConnected(e: GamepadEvent){
		setInput(new GamepadInput(e.gamepad));
	}

	function gamepadLoop(){
		if(!input) return;
		input.update();

		animationFrame = requestAnimationFrame(gamepadLoop);
	}

	return <InputContext.Provider value={input}>{children}</InputContext.Provider>
}

export function useInput(){
	return React.useContext(InputContext);
}