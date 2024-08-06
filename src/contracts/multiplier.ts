// File: multiplier.ts

import { SmartContract, assert, method, prop } from 'scrypt-ts'

export class Multiplier extends SmartContract {
    @prop()
    num1: bigint

    @prop()
    num2: bigint

    constructor(num1: bigint, num2: bigint) {
        super(...arguments)
        this.num1 = num1
        this.num2 = num2
    }

    @method()
    public unlock() {
        const result = this.num1 * this.num2
        assert(result > 0, 'multiplication result is incorrect')
    }
}
