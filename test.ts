import {
    EtherTypeAssertion,
    isAddress,
    isBlockHash,
    isPrivateKey,
    isPublicKey,
} from './index';

const ErrExpectTrue = (prefix: string, input: string) => { throw new Error(`[${prefix} - input : ${input}] it's expect true, but returns false.`); }
const ErrExpectFalse = (prefix: string, input: string) => { throw new Error(`[${prefix} - input : ${input}] it's expect false, but returns true.`); }

function main() {
    try {
        isAddress_Test();
        isBlockHash_Test();
        isPrivateKey_Test();
        isPublicKey_Test();
        typeAssertion_Test();
    } catch (error) {
        console.log(error);
    }
};
main();

function isAddress_Test() {
    let testname = "isAddress";
    let address1 = "0x564369022fDE19d63c6d72a23b48Ad4e20CE235C";
    let address2 = "0x564369022fDE19d63c6d72a23b48Ad4e20CE2";
    let address3 = "ethereum.org";

    if (!isAddress(address1)) 
        throw ErrExpectTrue(testname, address1);
    if (isAddress(address2)) 
        throw ErrExpectFalse(testname, address2);
    if (isAddress(address3)) 
        throw ErrExpectFalse(testname, address3);
}
function isBlockHash_Test() {
    let testname = "isBlockHash";
    let hash1 = "0x60fc96a24c2856d926d251b4fe883cb98749e1a20b35783b994704b9c6e0e970";
    let hash2 = "0x60fc96a24c2856d926d251b4fe883cb98749e1a20b35783b994704b9";
    let hash3 = "0x564369022fDE19d63c6d72a23b48Ad4e20CE235C"
    
    if (!isBlockHash(hash1))
        throw ErrExpectTrue(testname, hash1);
    if (isBlockHash(hash2)) 
        throw ErrExpectFalse(testname, hash2);
    if (isBlockHash(hash3)) 
        throw ErrExpectFalse(testname, hash3);

}
function isPrivateKey_Test() {
    let testname = "isPrivateKey";
    let privKey1 = "0x0123456789012345678901234567890123456789012345678901234567890123";
    let privKey2 = "0x012345678901234567890123456789012345678901234567890123456";
    let privKey3 = "ethereum.org";

    if (!isPrivateKey(privKey1))
        throw ErrExpectTrue(testname, privKey1);
    if (isPrivateKey(privKey2)) 
        throw ErrExpectFalse(testname, privKey2);
    if (isPrivateKey(privKey3)) 
        throw ErrExpectFalse(testname, privKey3);
}
function isPublicKey_Test() {
    let testname = "isPublicKey";
    // TODO
    let pubKey1 = "0x04e68acfc0253a620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39";

    if (!isPublicKey(pubKey1)) 
        throw ErrExpectTrue(testname, pubKey1);
}

function typeAssertion_Test() {
    let address1 = "0x564369022fDE19d63c6d72a23b4d4e20CE235C";

    // type 1
    EtherTypeAssertion(isAddress, address1, ()=>{throw new Error("is not address.");})

    // type 2
    let afterWork = () => { console.log('is not address.'); }
    EtherTypeAssertion(isAddress, address1, afterWork);
}