import {
    EtherTypeAssertion,
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

    let testset = [
        {value: "0x1e7bcc70c72770dbb72fea022e8a6d07f814d2ebe4de9ae3f7af75bf706902a7b73ff919898c836396a6b0c96812c3213b99372050853bd1678da0ead14487d7", expect: true},
    ];

    for (const elem of testset) {
        if(elem.expect != isPublicKey(elem.value)) {
            throw new Error(`${testname} | input: ${elem.value} | expect : ${elem.expect} | result : ${!elem.expect}`);
        }
    }
}

function typeAssertion_Test() {
    let address1 = "0x564369022fDE19d63c6d72a23b48Ad4e20CE235C";
    let address2 = "0x564369022fDE19d63c6d72a23b48Ad4e20CE235C";

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
}

