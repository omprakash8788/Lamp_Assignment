import React, { useState } from 'react';
import Lamp from './component/Lamp';

function App() {
  const [isLampOn, setLampOn] = useState(false);

  const toggleLamp = () => {
    setLampOn(!isLampOn);
  };

  return (
    <div className="App">
      <Lamp isOn={isLampOn} />
      <button onClick={toggleLamp}>{isLampOn ? 'Turn Off' : 'Turn On'}</button>
    </div>
  );
}

export default App;
