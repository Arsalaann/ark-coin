const Blockchain=require('./index');
const Block=require('./block');

describe('Blockchain', () => {
    let bc,bc2;

    beforeEach(() =>{
        bc=new Blockchain();
        bc2=new Blockchain();
    });

    it('Starts with genesis ',() =>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('Block Added or not',()=>{
        const data='foo';
        bc.addBlock(data);
        
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('Validates a valid chain ',() =>{
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('It invalidates a chain with corrupt geneseis block ',() =>{
        bc2.chain[0].data='Bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('Invalidates a corrupt chain ',() =>{
        bc2.addBlock('foo');
        bc2.chain[0]='Not foo';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('Replaces the chain with new chain ',()=>{
        bc2.addBlock('hello');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    })

    it('Does not replace chain of less or equal length ',()=>{
        bc.addBlock('good');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    })

});