import type { Component } from 'solid-js';
import { useTheme } from '../../hooks/ThemeProvider';

const Settings: Component = () => {
  const {themes, setTheme} = useTheme();

  function onSelect(event: Event) {
    setTheme(event.target.value);
  }

  return (
    <div>
      <h1>Settings</h1>
      <select name="Theme" id="cars" onChange={onSelect}>
        {themes.map((theme: string) => <option value={theme}>{theme}</option>)}
      </select>
    </div>
  );
};

export default Settings;