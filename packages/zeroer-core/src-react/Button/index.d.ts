import React, { Component } from 'react';
import './index.scss';
interface ButtonProps {
    type?: 'primary' | 'danger';
    onClick?: () => void;
    children?: React.ReactNode;
    [otherProps: string]: any;
}
interface ButtonState {
    counter: number;
}
declare class Button extends Component<ButtonProps, ButtonState> {
    static defaultProps: {
        type: string;
        onClick: () => void;
    };
    readonly state: {
        counter: number;
    };
    handleClick: () => void;
    render(): JSX.Element;
}
export { Button };
