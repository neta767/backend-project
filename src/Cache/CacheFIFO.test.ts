import {expect} from "chai";
import {CacheFIFO} from './CacheFIFO'

describe('FIFO algo test', () => {
    describe('scenario: not expected capacity( we set 4 elements', () => {
        const cache = new CacheFIFO<string, number>(4)
        describe('getElement() function', () => {
            it('should return undefined if this cache contains no mapping for the key', function () {
                expect(cache.getElement('test')).to.be.eq(undefined)
            });

            it('should return the value to which the specified key is mapped', function () {
                cache.setElement('e1', 1)
                expect(cache.getElement('e1')).to.be.eq(1)
            });

        });

        describe('setElement() function', () => {
            it('should return the value to which the specified key is mapped', function () {
                cache.setElement('e1', 1)
                cache.setElement('e1', 2)
                expect(cache.getElement('e1')).to.be.eq(2)
            });
        });

        describe('removeElement() function', () => {
            it('should return the value to which the specified key is mapped', function () {
                cache.setElement('e1', 1)
                cache.setElement('e1', 2)
                expect(cache.getElement('e1')).to.be.eq(2)
            });
        });
    });
})