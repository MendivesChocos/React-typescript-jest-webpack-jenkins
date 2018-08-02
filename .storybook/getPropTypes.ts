import * as PropTypes from 'prop-types';

const PropTypesMap = new Map();

Object.keys(PropTypes).forEach((typeName) => {
  const type = PropTypes[typeName];
  PropTypesMap.set(type, typeName);
  PropTypesMap.set(type.isRequired, typeName);
});

export const propsFromPropTypes = (type) => {
  const props = {};
  if (type.propTypes) {
    Object.keys(type.propTypes).forEach((property) => {
      const typeInfo = type.propTypes[property];
      const required = typeInfo.isRequired === undefined;
      const propType = PropTypesMap.get(typeInfo) || 'other';
      props[property] = { property, propType, required };
    });
  }
  if (type.defaultProps) {
    Object.keys(type.defaultProps).forEach((property) => {
      const value = type.defaultProps[property];
      if (value === undefined) return;
      if (!props[property]) {
        props[property] = { property };
      }
      props[property].defaultValue = (typeof value === 'object') ? JSON.stringify(value) : value;
    });
  }
  return props;
};
