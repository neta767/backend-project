import {describe} from "node:test";
import {expect} from "chai";
import {CacheRandom} from "../Cache/CacheRandom";


const testClass = new CacheRandom<string, number>(4)


describe('this is for RandomCache', () => {
    it('setElement, should return undefined for new key and Cache not full', () => {
        const result = testClass.setElement('a', 1)
        expect(result).to.equal(undefined)
    })


    it('setElement, should return the same key for a key that already exists', () => {
        const result = testClass.setElement('a', 1)
        expect(result).to.equal('a')
    })
    /// how to test a result of a random key return??
    // it('setElement, should return random key" after setting to a full Cache', () => {
    //     testClass.setElement('b', 2)
    //     testClass.setElement('c', 3)
    //     testClass.setElement('d', 4)
    //     const result = testClass.setElement('e', 5)
    //     expect(result).to.equal()
    // })
    it('getElement, should return number 1 for existing key "existingKey"', () => {
        testClass.setElement('existingKey', 1);
        const result = testClass.getElement('a');
        expect(result).to.equal(1)
    })

    it('getElement, should return undefined for a key that does not exist', () => {
        const result = testClass.getElement('fdsngohdso');
        expect(result).to.equal(undefined)
    })

    it('removeElement, should return true for existing key', () => {
        testClass.setElement('removetest1', 1)
        const result = testClass.removeElement('removetest1');
        expect(result).to.equal(true)
    })

    it('removeElement, should return false for none existing key', () => {

        const result = testClass.removeElement('doesNotExistKey');
        expect(result).to.equal(false)
    })


})
