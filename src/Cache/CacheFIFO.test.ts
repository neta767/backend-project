import {expect} from "chai";
import {CacheFIFO} from './CacheFIFO'
import {beforeEach} from "mocha";

describe('FIFO algo test', () => {
    describe('scenario: not expected capacity (we set 3 elements)', () => {
        let cache: CacheFIFO<string, number>
        describe('getElement() function', () => {
            beforeEach(() => {
                cache = new CacheFIFO<string, number>(3)
            })

            it('should return undefined if this cache contains no mapping for the key', function () {
                expect(cache.getElement('test')).to.be.eq(undefined)
            });

            it('should return the value to which the specified key is mapped', function () {
                cache.setElement('k1', 1)
                expect(cache.getElement('k1')).to.be.eq(1)
            });
        });

        describe('setElement() function', () => {
            beforeEach(() => {
                cache = new CacheFIFO<string, number>(3)
            })

            it("should return undefined if the key doesn't exist & cache not full ", function () {
                expect(cache.setElement('k1', 1)).to.be.eq(undefined)
                expect(cache.setElement('k2', 2)).to.be.eq(undefined)
                expect(cache.setElement('k3', 3)).to.be.eq(undefined)
            });

            it("return removed key if the key doesn't exist & cache full should", function () {
                cache.setElement('k1', 1)
                cache.setElement('k2', 2)
                cache.setElement('k3', 3)
                expect(cache.setElement('k4', 4)).to.be.eq('k1')
                expect(cache.setElement('k5', 5)).to.be.eq('k2')
                expect(cache.setElement('k6', 6)).to.be.eq('k3')
                expect(cache.setElement('k7', 7)).to.be.eq('k4')
            });

            it("should return key if the key exist", function () {
                cache.setElement('k1', 1)
                expect(cache.setElement('k1', 2)).to.be.eq('k1')
            });

            it("should set new value if the key exist", function () {
                cache.setElement('k1', 1)
                cache.setElement('k1', 2)
                expect(cache.getElement('k1')).to.be.eq(2)
            });
        });

        describe('removeElement() function', () => {
            beforeEach(() => {
                cache = new CacheFIFO<string, number>(3)
            })

            it('should return true if key is present', function () {
                cache.setElement('k1', 1)
                expect(cache.removeElement('k1')).to.be.true
            });
            it('should return false if key is missing', function () {
                cache.setElement('k1', 1)
                expect(cache.removeElement('k2')).to.be.false
            });
        });
    });
});
