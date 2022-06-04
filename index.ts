// ethereum type check util.

interface typeChecker {
    (value: string): boolean;
}
interface postFuncion {
    (): void;
}

function isHexString(value: string, length: number): boolean {
    if (!value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}

export function EtherTypeAssertion(typc: typeChecker, value: string, fn: postFuncion) {
    if (!typc(value)) 
        fn();
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

export function isAddress(value: string): boolean {
    return isHexString(value, 20);
}

export function isVerifyingContract(value: string): boolean {
    return isHexString(value, 20);
}
