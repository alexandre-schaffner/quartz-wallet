import type { Component } from 'solid-js';
import { Router, Route, Routes, A } from "@solidjs/router";

import Home from "./components/pages/Home";
import Transfer from "./components/pages/Transfer";
import DApps from "./components/pages/DApps";
import Settings from "./components/pages/Settings";

import Navbar from "./components/layout/Navbar";

import styles from './App.module.css';
import useLayout from './hooks/useLayout';

const App: Component = () => {
    const { isMobile } = useLayout();

    return (
    <div class={[styles.App, isMobile() && styles.mobile].join(" ")}>
      <Navbar desktop pages={[
        { url: "/home", icon: "home", name: "Home" },
        { url: "/transfer", icon: "repeat", name: "Transfer" },
        { url: "/dapps", icon: "grid", name: "dApps" },
        { url: "/settings", icon: "settings", name: "Settings" },
      ]} />
      <div>
        <Routes>
          <Route path="/home" component={Home} />
          <Route path="/transfer" component={Transfer} />
          <Route path="/dapps" component={DApps} />
          <Route path="/settings" component={Settings} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
