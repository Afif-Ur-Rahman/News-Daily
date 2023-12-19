import React, { useState, useEffect } from "react";
import News2 from "./News2";

const VideoBackground = () => {
  const apiKey = "0e472b03a49f4ebbb35b9e58a4095caf";

  return (
    <>
      <div className="video-background">
        <video autoPlay muted loop>
          <source src="/background4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="background"></div>
      </div>
      <div className="content">
        <News2 country="us" pageSize={15} category="general" apiKey={apiKey} />
      </div>
    </>
  );
};

export default VideoBackground;
