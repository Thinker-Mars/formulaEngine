export const isFunction = (input: unknown) => {
    return input instanceof Function;
}

export const replaceBlank = (input: string) => { 
	return input.replace(/\s+/g, '');
}

export const reachInputEnd = (position: number, inputLength: number) => {
    return position === (inputLength - 1);
}

export const invariant = (condition: boolean, message: string) => {
    if (condition) {
        return;
    }

    throw new Error(message);
}