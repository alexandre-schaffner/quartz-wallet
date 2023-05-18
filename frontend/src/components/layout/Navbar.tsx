import type { Component } from 'solid-js';
import { Router, Route, Routes, A } from "@solidjs/router";
import Icon from '../decoration/Icon';

import useLayout from '../../hooks/useLayout';

import styles from "./Navbar.module.css";

type Page = {
    url: string,
    name: string
    icon?: string,
}

type NavbarProps = {
    pages: Page[],
    desktop?: boolean
}

const Navbar: Component<NavbarProps> = (props) => {
    const { isMobile } = useLayout();

    const desktopLinks = () => props.pages.map(({ url, name: n, icon }) => <A href={url} activeClass={[styles.selected, "catchy"].join(" ")}><Icon ion={icon} /> {n}</A>);
    const mobileLinks = () => props.pages.map(({ url, name: n, icon }) => <A href={url} activeClass={styles.selected}><Icon ion={icon} /></A>);

    return <>
        <nav class={[styles.desktop, isMobile() && styles.off, "catchy"].join(" ")}>
            {desktopLinks()}
        </nav>
        <nav class={[styles.bar, !isMobile() && styles.off].join(" ")}>{mobileLinks()}</nav>
    </>
};

export default Navbar;
