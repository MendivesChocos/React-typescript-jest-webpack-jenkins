import * as styledComponents from 'styled-components';
import { ITheme } from './themes';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as
  styledComponents.ThemedStyledComponentsModule<any> as
  styledComponents.ThemedStyledComponentsModule<ITheme>;

// export default styled;
export { styled, css, injectGlobal, keyframes, ThemeProvider };
