/* eslint-disable no-undef */
import { dateFromString } from '../../src/lib/index.js';

describe('Test dateFromString transformer function', () => {
  it('Should return a date object based on string provided', () => {
    expect(dateFromString('13 Nov 2009')).toEqual(new Date(2009, 10, 13));
  });
});
