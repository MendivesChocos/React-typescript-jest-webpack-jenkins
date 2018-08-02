import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { Wrapper } from './Containers/Wrapper';

setOptions({
  name: "Aptitus",
  showAddonPanel: false,
});
addDecorator(story => <Wrapper>{story()}</Wrapper>)

const req = require.context('../stories/', true, /storie/);
function loadStories() {
    req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
