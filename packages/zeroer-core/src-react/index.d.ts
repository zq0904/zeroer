import * as React from 'react';
import './style/index.less';
declare const ButtonTypes: ["primary", "danger"];
declare type ButtonType = (typeof ButtonTypes)[number];
interface ButtonProps {
    type?: ButtonType;
    children?: React.ReactNode;
}
interface ButtonState {
    d: boolean;
}
declare class Button extends React.Component<ButtonProps, ButtonState> {
    static defaultProps: {
        type: string;
    };
    render(): JSX.Element;
}
export { Button };
