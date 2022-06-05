// ethereum type check util.

interface typeChecker {
    (value: string): boolean;
}
interface postFuncion {
    (): void;
}

export const ThrowError = (mesg: string) => {
    throw new Error(mesg);
}

export function EtherTypeAssertion(typc: typeChecker, value: string, postFnOrErrorMesg: postFuncion | string) {
    if (!typc(value)) {
        if (postFnOrErrorMesg === 'string') {
            let errorMesg: string = postFnOrErrorMesg;
            ThrowError(errorMesg);
        } else {
            let postFn: any = postFnOrErrorMesg;
            postFn();
        }
    }
}

export function isHexString(value: string, length: number): boolean {
    if (!/^0x[0-9A-Fa-f]*$/.test(value)) {
        return false
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}

export function isPublicKey(value: string): boolean {
    return isHexString(value, 64);
}

export function isPrivateKey(value: string): boolean {
    return isHexString(value, 32);
}

export function isBlockHash(value: string): boolean {
    return isHexString(value, 32);
}

export function isBlockHashOrBlockTag(value: string): boolean {
    return isHexString(value, 32);
}

export function isFromBlockOrBlockHash(value: string): boolean {
    return isHexString(value, 32);
}

export function isTopic(value: string): boolean {
    return isHexString(value, 32);
}

export function isAddress(value: string): boolean {
    return isHexString(value, 20);
}

export function isVerifyingContract(value: string): boolean {
    return isHexString(value, 20);
}
