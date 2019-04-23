import * as utils from "../../src/utils/utils";

describe('Normalize port', () => {
    it('Should return number when string', () => {
        const port = utils.normalizePort('8080');
        expect(typeof (port)).toBe('number');
    });
});