import * as React from 'react';
import { propsFromPropTypes } from '../getPropTypes';
import styled from 'styled-components';
import { Table } from '../Components/Table';

const Wrapper = styled.div`
  color: #6f6f6f;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0;
`;

const Line = styled.div`
  border-top: 1px dashed #e8e8e8;
  margin: 30px 0;
`;

const ButtonProp = styled.button`
  background: #08d279;
  border: 0;
  color: white;
  cursor: pointer;
  display: flex;
  font-weight: bold;
  left: 0;
  outline: 0;
  padding: 7px 15px;
  position: absolute;
  top: 0;
  &>span{
    bottom: -1px;
    display: block;
    font-size: 20px;
    font-weight: normal;
    height: 15px;
    line-height: 15px;
    position: relative;
    text-align: right;
    width: 25px;
    &.less{
      bottom:1px;
      letter-spacing:-2px;
    }
  }
`;

interface Props {
  Component?: any;
  RenderComponent?: any;
  showProp?: boolean;
}

interface State {
  showProp?: boolean;
}

export class PropTypesLayout extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showProp: this.props.showProp || false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      showProp: !prevState.showProp,
    }));
  }

  toggleButton(isShow):JSX.Element {
    let title = 'Mostrar Prop Types';
    let icon = <span>+</span>;

    if (isShow) {
      title = 'Ocultar Prop Types';
      icon = <span className="less">--</span>;
    }

    return <ButtonProp onClick={this.toggle} title={title}> PropTypes {icon}</ButtonProp>;
  }

  render() {
    const {
      Component,
      RenderComponent,
      showProp,
    } = this.props;

    return (
      <Wrapper>
        {this.toggleButton(this.state.showProp)}
        {this.state.showProp &&
            <React.Fragment>
              <Title>Prop Types - {Component.name}</Title>
              <Table propDefinitions={propsFromPropTypes(Component)}/>
              <Line />
            </React.Fragment>}
        <RenderComponent />
      </Wrapper>
    );
  }
}

export const WithPropTypes = (params) => {
  return () => <PropTypesLayout {...params} />;
};
