import {describe} from "node:test";
import {expect} from "chai";
import {CacheLRU} from "./index";

const test = new CacheLRU(3);

describe('this is for Cache LRU, __capacity = 3', () => {
    it(`getElement, should return undefined for getting non-existing key 1`, () => {
        const res = test.getElement(1);
        expect(res).to.equals(undefined);
    });
    it(`setElement, should return undefined for setting a new key 1`, () => {
        const res = test.setElement(1, 1);
        expect(res).to.equals(undefined);
    });
    it(`getElement, should return 1 for getting existing key 1`, () => {
        const res = test.getElement(1)
        expect(res).to.equals(1);
    });
    it(`setElement, should return 1 for setting an existing key 1`, () => {
        const res = test.setElement(1, 1);
        expect(res).to.equals(1);
    });
    it(`setElement, should return undefined for setting a new key 2`, () => {
        const res = test.setElement(2, 2);
        expect(res).to.equals(undefined);
    });
    it(`setElement, should return undefined for setting a new key 3`, () => {
        const res = test.setElement(3, 3);
        expect(res).to.equals(undefined);
    });
    it(`setElement, should return 3 for setting an existing key 3`, () => {
        const res = test.setElement(3, 3);
        expect(res).to.equals(3);
    });
    it(`isFull, should return true because we have 3 nodes and _capacity = 3`, () => {
        const res = test.isFull();
        expect(res).to.equals(true);
    });
    it(`removeElement, should return false for removing non-existing key 4`, () => {
        const res = test.removeElement(4);
        expect(res).to.equals(false);
    });
    it(`removeElement, should return treu for removing existing key 3`, () => {
        const res = test.removeElement(3);
        expect(res).to.equals(true)
    });
    it(`isFull, should return false because we have 2 nodes and _capacity = 3`, () => {
        const res = test.isFull();
        expect(res).to.equals(false)
    });
    it(`setElement, should return undefined for setting a new key 3`, () => {
        console.log(`adding 3 again to check setElement() with a new key when cache is full.`)
        const res = test.setElement(3, 3);
        expect(res).to.equals(undefined);
    });
    it(`setElement, should return 1 for setting a new key 4 and _capacity = 3`, () => {
        const res = test.setElement(4, 4);
        expect(res).to.equals(1);
    });
    it(`removeElement, should return false for removing non-existing key 1`, () => {
        console.log(`checking that 1 is really removed after setting key 4 and cache was full`)
        const res = test.removeElement(1);
        expect(res).to.equals(false);
    });
});