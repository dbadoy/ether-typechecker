// ethereum type check util.

interface typeChecker {
    (value: any): boolean;
}
interface postFuncion {
    (): void;
}

function isHexString(value: any, length: number): boolean {
    if (typeof(value) !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false
    }
    if (length && value.length !== 2 + 2 * length) { return false; }
    return true;
}

export function EtherTypeAssertion(typc: typeChecker, value: any, fn: postFuncion) {
    if (!typc(value)) 
        fn();
}

export function isPublicKey(value: any): boolean {
    return isHexString(value, 64);
}

export function isPrivateKey(value: any): boolean {
    return isHexString(value, 32);
}

export function isBlockHash(value: any): boolean {
    return isHexString(value, 32);
}

export function isBlockHashOrBlockTag(value: any): boolean {
    return isHexString(value, 32);
}

export function isFromBlockOrBlockHash(value: any): boolean {
    return isHexString(value, 32);
}

export function isAddress(value: any): boolean {
    return isHexString(value, 20);
}

export function isVerifyingContract(value: any): boolean {
    return isHexString(value, 20);
}
