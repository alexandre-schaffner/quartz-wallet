import type { Component } from 'solid-js';

type IconProps = {
    ion: string;
};

const Icon: Component<IconProps> = (props) => {
    return <ion-icon name={props.ion} />;
};

export default Icon;
