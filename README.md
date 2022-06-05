# ether-typechecker
Simple and tiny ethereum type checker in Typescript.

## Install
```
npm install i ether-typechecker
```

## Feature

```typescript
EtherTypeAssertion(typc: typeChecker, value: string, postFnOrErrorMesg: postFuncion | string)

/*
  interface typeChecker {
    (value: string): boolean;
  }
  
  interface postFuncion {
    (): void;
  }
*/

// typeCheckers
isPublicKey(value: string): boolean

isPrivateKey(value: string): boolean

isBlockHash(value: string): boolean

isBlockHashOrBlockTag(value: string): boolean

isFromBlockOrBlockHash(value: string): boolean

isTopic(value: string): boolean

isAddress(value: string): boolean

isVerifyingContract(value: string): boolean
```

## Examples
```typescript
// use methods
let addr = "0x564369022fDE19d63c6d72a23b48Ad4e20CE235C";
if (!isAddress(addr) {
  // throw error
}

// use TypeAssertion
// case 1
// throw errors if type assertion failed. 
EtherTypeAssertion(isAddress, addr, "is not address.");

// case 2
// call custom function if type assertion failed.
let doSomething = () => {
  // logic ...
}
EtherTypeAssertion(isAddress, addr, doSomthing);


```


