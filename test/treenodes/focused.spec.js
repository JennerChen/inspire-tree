const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');

describe('TreeNodes.prototype.focused', function() {
    let tree;

    before(function() {
        // Create tree
        tree = new InspireTree({
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().focused).to.be.a('function');
        expect(tree.focused).to.be.a('function');
    });

    it('returns focused root nodes', function() {
        expect(tree.focused()).to.have.length(0);

        tree.node(1).focus();

        expect(tree.focused()).to.have.length(1);
    });
});
