import * as React from 'react';
import styled from 'styled-components';

export const Table = ({ propDefinitions }) => {
  const Th = styled.th`
    border-top: 1px solid #eceeef;
    padding: .75rem;
    vertical-align: top;
  `;
  const Td = styled.td`
    border-top: 1px solid #eceeef;
    padding: .75rem;
    vertical-align: top;
  `;
  const Table = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 50px;
    margin: 10px 0 30px 0;
    text-align: left;
    thead tr {
      text-transform: uppercase;
    }
    tbody tr:nth-of-type(odd) {
      background-color: #ecf0f2;
    }
  `;
  const Label = styled.span`
    background-color: #f35958;
    border-radius: .25em;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    padding: 3px 9px;
    text-align: center;
    text-shadow: none;
  `;
  const props = Object.keys(propDefinitions).map((key) => {
    const { property, propType, required, description, defaultValue } = propDefinitions[key];
    return (
      <tr key={property}>
        <Td>{property}</Td>
        <Td>{propType}</Td>
        <Td>{required ? <Label>yes</Label> : '-'}</Td>
        <Td>{typeof defaultValue !== 'undefined' ? `'${defaultValue}'` : '-'}</Td>
      </tr>
    );
  });
  return (
    <Table>
      <thead>
      <tr>
        <Th>Name</Th>
        <Th>Type</Th>
        <Th>Required</Th>
        <Th>Default</Th>
      </tr>
      </thead>
      <tbody>{props}</tbody>
    </Table>
  );
};
