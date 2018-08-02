import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

const globalStyle = () => injectGlobal`
  @import "https://cds.urbania.g3c.pe/atomic/css/fonts.css?201804101601";
  ${styledNormalize}
`;

export { globalStyle };
