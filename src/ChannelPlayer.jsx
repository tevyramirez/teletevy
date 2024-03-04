import React, { useState, useRef, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useHotkeys } from 'react-hotkeys-hook';

function ChannelPlayer() {
  const [currentChannel, setCurrentChannel] = useState(0);
  const currentPlayerRef = useRef(null);
  const channels = [
    <iframe
      key="channel1"
      src="https://mdstrm.com/live-stream/57a498c4d7b86d600e5461cb?jsapi=true&autoplay=true&controls=true&volume=75&player=57f40bb4dc5b9f3075c49cfe&access_token=MeemNLjGYqMsEpLxJDsXsaKOdoDeh06Am1xBkRI20uGODG5yAuGgb25IaA5efiLrXgB7obVtEPD&custom.ui=%252F317342475%252Ftvn&custom.tvn_demo=&custom.tvn_tipo=EnVivo&custom.tvn_seccion=Portada&custom.tvn_articulo=&custom.tvn_tags="
      width="1000"
      height="562"
      frameBorder="0"
      allow="autoplay; fullscreen; encrypted-media"
      allowFullScreen
      allowScriptAccess="always"
      scrolling="no"
      title="TV Player"
    />,
    <iframe
      key="channel2"
      src="https://rudo.video/live/c13?c3=13CL&autostart=1&volume=0&tag=eyJwcmUiOiJodHRwczpcL1wvcHViYWRzLmcuZG91YmxlY2xpY2submV0XC9nYW1wYWRcL2Fkcz9pdT1cLzExMjM3MjIwN1wvZW52aXZvLmNsXC9lbnZpdm9cL3ByZXJvbGwmZGVzY3JpcHRpb25fdXJsPWh0dHAlM0ElMkYlMkZ3d3cuMTMuY2wlMkZlbi12aXZvJmVudj12cCZpbXBsPXMmY29ycmVsYXRvcj0mdGZjZD0wJm5wYT0wJmdkZnBfcmVxPTEmb3V0cHV0PXZhc3Qmc3o9NjU2eDM2OCZjaXVfc3pzPTcyOHg5MCw5NzB4OTAsOTcweDI1MCwxOTAweDgyNSwxOTIweDc2OCw0MDB4NjAmdW52aWV3ZWRfcG9zaXRpb25fc3RhcnQ9MSZwbW5kPTAmcG14ZD0xMjAwMDAmcG1hZD0yJnBvZD0xIiwicG9zdCI6IjAiLCJtaWQiOnsidGFnIjoiMCIsInRpbWUiOltdfSwib3ZlciI6eyJ0YWciOiJodHRwczpcL1wvcHViYWRzLmcuZG91YmxlY2xpY2submV0XC9nYW1wYWRcL2Fkcz9pdT1cLzExMjM3MjIwN1wvZW52aXZvLmNsXC9lbnZpdm9cL292ZXJsYXkmZGVzY3JpcHRpb25fdXJsPWh0dHAlM0ElMkYlMkZ3d3cuMTMuY2wlMkZlbi12aXZvJmVudj12cCZpbXBsPXMmY29ycmVsYXRvcj0mdGZjZD0wJm5wYT0wJmdkZnBfcmVxPTEmb3V0cHV0PXZhc3QmdmFkX3R5cGU9bm9ubGluZWFyJnN6PTQwMHg2MCZtaSIsInRpbWUiOls2MF19fQ=="
      width="1000"
    height="562"
      frameBorder="0"
      allow="autoplay; fullscreen; encrypted-media"
      allowFullScreen
      allowScriptAccess="always"
      scrolling="no"
      title="Video Player"
    />,
    <iframe
      key="channel3"
      src="https://mdstrm.com/live-stream/63ee47e1daeeb80a30d98ef4?jsapi=true&autoplay=true&access_token=6NteznT60g6rzkh5L1eUn3GRywp104fpc4engfZOv1Xho9WKWa6r2GATPi2BaJ5m9tRYP79ohC0&custom.categoria_prontus=senal-online&custom.dfpLanguage=es&custom.dfpCountry=cl&custom.dfpShowName=-&custom.dfpVidId=63ee47e1daeeb80a30d98ef4&custom.dfpURLEncoded=https%3A%2F%2Fwww.chilevision.cl%2Fsenal-online&custom.dfpRandomNumber=3353890286&custom.origen=chilevision&custom.iu=%2F1047933%2Fchilevision&custom.app=false&custom.cust_params=sect%253Dlive%2526sub%253Dsenal-online%2526show%253D-%2526videotype%253Dlive%2526cat%253Dlive%2526vidid%253D63ee47e1daeeb80a30d98ef4%2526site%253Dchilevision%2526app%253Dfalse%2526theme%253Dge&custom.amp=false&custom.appname="
      width="1000"
    height="562"
      frameBorder="0"
      allow="autoplay; fullscreen; encrypted-media"
      allowFullScreen
      allowScriptAccess="always"
      scrolling="no"
      title="ChileVision Player"
    />,
    
  ];

  useEffect(() => {
    const player = currentPlayerRef.current;
    if (player) {
      console.log('player', player.muted)
      player.muted = true;
      console.log('player2', player.muted)
    }
    return () => {
      if (player) {
        console.log('player3', player.muted)
        player.muted = false;
        console.log('player4', player.muted)
      }
    };
  }, [currentChannel]);

  useHotkeys('left', () => handlePrev(), { enableOnTags: ['INPUT'] });
  useHotkeys('right', () => handleNext(), { enableOnTags: ['INPUT'] });

  const handleNext = () => {
    setCurrentChannel((currentChannel + 1) % channels.length);
  };

  const handlePrev = () => {
    setCurrentChannel((currentChannel - 1 + channels.length) % channels.length);
  };

  return (
    <div>
      <SwipeableViews
        index={currentChannel}
        onChangeIndex={setCurrentChannel}
      >
        {channels.map((channel, index) => (
          <div key={index}>
            <iframe
              ref={index === currentChannel ? currentPlayerRef : null}
              {...channel.props}
            />
          </div>
        ))}
      </SwipeableViews>
      <button onClick={handlePrev}>Anterior</button>
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
}

export default ChannelPlayer;