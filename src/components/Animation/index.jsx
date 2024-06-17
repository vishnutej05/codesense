import React, { useEffect, useState } from 'react';

const Animation = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      {scriptLoaded && (
        <dotlottie-player
          src="https://lottie.host/786a5dd9-2029-4c76-8e67-30e377a39663/ZStW6T9YP6.lottie"
          background="transparent"
          speed="1"
          style={{ width: '500px', height: '500px' }}
          loop
          autoplay
        ></dotlottie-player>
      )}
    </div>
  );
};

export default Animation;
