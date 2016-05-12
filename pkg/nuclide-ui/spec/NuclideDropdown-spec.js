'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import {Dropdown} from '../lib/Dropdown';
import {React, ReactDOM, TestUtils} from 'react-for-atom';

const {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = TestUtils;

describe('Dropdown', () => {

  it('honors the selectedIndex param', () => {
    const component = renderIntoDocument(
      <Dropdown
        menuItems={[
          {label: 'foo', value: 'vfoo'},
          {label: 'bar', value: 'vbar'},
        ]}
        onSelectedChange={newIndex => {}}
        selectedIndex={1}
      />
    );

    const select = scryRenderedDOMComponentsWithTag(component, 'select');
    expect(ReactDOM.findDOMNode(select[0]).selectedIndex).toBe(1);
    expect(ReactDOM.findDOMNode(select[0]).value).toBe('vbar');
  });

  it('calls the callback with the new index when a different menu item is selected', () => {
    let changedIndex;
    const component = renderIntoDocument(
      <Dropdown
        menuItems={[
          {label: 'foo', value: 'vfoo'},
          {label: 'bar', value: 'vbar'},
        ]}
        onSelectedChange={index => {
          changedIndex = index;
        }}
        selectedIndex={0}
      />
    );

    const select = scryRenderedDOMComponentsWithTag(component, 'select');
    ReactDOM.findDOMNode(select[0]).selectedIndex = 1;
    Simulate.change(ReactDOM.findDOMNode(select[0]));
    expect(changedIndex).toBe(1);
  });
});
