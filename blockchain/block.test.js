const Block=require('./block');

describe('Block', () => {
    let data,lastBlock,block;

    beforeEach(() => {
        data='foo';
        lastBlock=Block.genesis();
        block=Block.mineBlock(lastBlock,data);
    });

    it('sets the `data` ',() => {
        expect(block.data).toEqual(data);
    });

    it('Is Lasthash equals to Hash ',() => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('generates a hash that matches difficulty',()=>{
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    it('lowers the difficulty during given condition',()=>{
        expect(Block.adjustDifficulty(block,block.timestamp+360000))
            .toEqual(block.difficulty-1);
    });

    it('raises the difficulty during given condition',()=>{
        expect(Block.adjustDifficulty(block,block.timestamp+1))
            .toEqual(block.difficulty+1);
    });
});