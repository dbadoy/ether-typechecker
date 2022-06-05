import {
    EtherTypeAssertion,
    ThrowError,
    isAddress,
    isBlockHash,
    isPrivateKey,
    isPublicKey,
} from './index';

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
    let testset = [
        {value: "0x564369022fDE19d63c6d72a23b48Ad4e20CE235C", expect: true},
        {value: "0x564369022fDE19d63c6d72a23b48Ad4e20CE2", expect: false},
        {value: "ethereum.org", expect: false},
    ];

    for (const elem of testset) {
        if(elem.expect != isAddress(elem.value)) {
            throw new Error(`${testname} | input: ${elem.value} | expect : ${elem.expect} | result : ${!elem.expect}`);
        }
    }
}

function isBlockHash_Test() {
    let testname = "isBlockHash";
    let testset = [
        {value: "0x60fc96a24c2856d926d251b4fe883cb98749e1a20b35783b994704b9c6e0e970", expect: true},
        {value: "0x60fc96a24c2856d926d251b4fe883cb98749e1a20b35783b994704b9", expect: false},
        {value: "0x564369022fDE19d63c6d72a23b48Ad4e20CE235C", expect: false},
    ];

    for (const elem of testset) {
        if(elem.expect != isBlockHash(elem.value)) {
            throw new Error(`${testname} | input: ${elem.value} | expect : ${elem.expect} | result : ${!elem.expect}`);
        }
    }
}

function isPrivateKey_Test() {
    let testname = "isPrivateKey";
    let testset = [
        {value: "0x0123456789012345678901234567890123456789012345678901234567890123", expect: true},
        {value: "0x012345678901234567890123456789012345678901234567890123456", expect: false},
        {value: "ethereum.org", expect: false},
    ];

    for (const elem of testset) {
        if(elem.expect != isPrivateKey(elem.value)) {
            throw new Error(`${testname} | input: ${elem.value} | expect : ${elem.expect} | result : ${!elem.expect}`);
        }
    }
}

function isPublicKey_Test() {
    let testname = "isPublicKey";
    // TODO
    let testset = [
        {value: "0x04e68acfc0253a620dff706b0a1b1f1f5833ea3beb3bde2250d5f271f3563606672ebc45e0b7ea2e816ecb70ca03137b1c9476eec63d4632e990020b7b6fba39", expect: true},
    ];

    for (const elem of testset) {
        if(elem.expect != isPublicKey(elem.value)) {
            throw new Error(`${testname} | input: ${elem.value} | expect : ${elem.expect} | result : ${!elem.expect}`);
        }
    }
}

function typeAssertion_Test() {
    let address1 = "0x564369022fDE19d63c6d72a23b48Ad4e20CE235C";
    let address2 = "0x564369022fDE19d63c6d72a23b48Ad4e20";

    // type 1
    EtherTypeAssertion(isAddress, address1, ()=> { throw new Error("is not address.");} )

    // type 2
    // define post function after assertion failed case.
    let postFunc1 = () => { console.log('is not address.'); }
    EtherTypeAssertion(isAddress, address1, postFunc1);

    let postFunc2 = () => { throw new Error("is not address."); }
    EtherTypeAssertion(isAddress, address2, postFunc2);

    // type3
    // throw errors with third parameter.
    EtherTypeAssertion(isAddress, address2, "is not address.");

    // type4
    // use imported ThrowError. it's throw errors with parameter.
    EtherTypeAssertion(isAddress, address2, ThrowError("is not address."));
}
