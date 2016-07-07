'use strict';

import * as _ from 'lodash';
import { collectionToModel } from './collection-to-model';
import cuid from 'cuid';
import { TreeNode } from '../treenode';

/**
 * Parse a raw object into a TreeNode used within a tree.
 *
 * Note: Uses native js over lodash where performance
 * benefits most, since this handles every node.
 *
 * @private
 * @param {object} tree Tree instance.
 * @param {object} object Source object
 * @param {object} parent Pointer to parent object.
 * @return {object} Final object
 */
export function objectToNode(tree, object, parent) {
    // Create or type-ensure ID
    object.id = object.id || cuid();
    if (typeof object.id !== 'string') {
        object.id = object.id.toString();
    }

    // High-performance default assignments
    var itree = object.itree = object.itree || {};
    itree.icon = itree.icon || false;

    var li = itree.li = itree.li || {};
    li.attributes = li.attributes || {};

    var a = itree.a = itree.a || {};
    a.attributes = a.attributes || {};

    var state = itree.state = itree.state || {};

    // Enabled by default
    state.collapsed = typeof state.collapsed === 'boolean' ? state.collapsed : tree.defaultState.collapsed;
    state.selectable = typeof state.selectable === 'boolean' ? state.selectable : tree.defaultState.selectable;

    // Disabled by default
    state.editable = typeof state.editable === 'boolean' ? state.editable : tree.defaultState.editable;
    state.editing = typeof state.editing === 'boolean' ? state.editing : tree.defaultState.editing;
    state.focused = state.focused || tree.defaultState.focused;
    state.hidden = state.hidden || tree.defaultState.hidden;
    state.indeterminate = state.indeterminate || tree.defaultState.indeterminate;
    state.loading = state.loading || tree.defaultState.loading;
    state.removed = state.removed || tree.defaultState.removed;
    state.selected = state.selected || tree.defaultState.selected;

    // Save parent, if any.
    object.itree.parent = parent;

    // Wrap
    object = _.assign(new TreeNode(tree), object);

    if (object.hasChildren()) {
        object.children = collectionToModel(tree, object.children, object);
    }

    // Fire events for pre-set states, if enabled
    if (tree.allowsLoadEvents) {
        _.each(tree.config.allowLoadEvents, function(eventName) {
            if (state[eventName]) {
                tree.emit('node.' + eventName, object);
            }
        });
    }

    return object;
};
