import findDeep from './find-deep';
import { expect } from 'chai';

describe('find deep', () => {
    const data = {
        "level_1": "1",
        "level_2": {
            "id": "1",

            "level_3": {
                "id": "2",
                "level_3_id": "3"
            }
        }
    };

    it('returns first level value', () => {
        const result = findDeep(data, ['level_1']);

        expect(result).to.equal('1');
    });

    it('returns 2nd level value', () => {
        const result = findDeep(data, ['level_2', 'id']);

        expect(result).to.equal('1');
    });

    it('returns 3rd level value', () => {
        const result = findDeep(data, ['level_2', 'level_3', 'id']);

        expect(result).to.equal('2');
    });
});