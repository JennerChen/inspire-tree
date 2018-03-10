const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNode.prototype.hidden', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).hidden).to.be.a('function');
    });

    it('returns false when visible', function() {
        expect(tree.node(1).hidden()).to.be.false;
    });

    it('returns true when hidden', function() {
        const node = tree.node(1);
        node.hide();

        expect(node.hidden()).to.be.true;
    });
});
