import React from 'react';

import ReactSpeedometer from 'react-d3-speedometer';

interface PropsSpeed {
  dataValue: number;
  width: number;
  textValue: string;
  title: {
    text1: string;
    text2: string;
    text3: string;
    text4: string;
  };
}

const GraphicSpeedometer: React.FC<PropsSpeed> = ({
  dataValue,
  width,
  title,
  textValue,
}) => {
  return (
    <>
      <ReactSpeedometer
        value={dataValue}
        // maxSegmentLabels={2}
        // segments={10}
        width={width}
        height={300}
        paddingHorizontal={5}
        paddingVertical={5}
        // startColor="#1c9cd9"
        currentValueText={textValue}
        segmentColors={[
          '#f1605b',
          'hsl(26.06741573033706, 100%, 65.09803921568627%)',
          'hsl(58.98305084745763, 100%, 65.29411764705883%)',
          'hsl(96.06741573033706, 100%, 65.09803921568627%)',
        ]}
        customSegmentStops={[0, 250, 500, 750, 1000]}
        customSegmentLabels={[
          {
            text: `${title.text1}`,
            // position: 'OUTSIDE',
            color: '#6d6a81',
          },
          {
            text: `${title.text2}`,
            // position: 'OUTSIDE',
            color: '#6d6a81',
          },
          {
            text: `${title.text3}`,
            // position: 'OUTSIDE',
            color: '#6d6a81',
          },
          {
            text: `${title.text4}`,
            // position: 'OUTSIDE',
            color: '#6d6a81',
          },
        ]}
        ringWidth={47}
        needleTransitionDuration={3333}
        // needleTransition="easeElastic"
        needleColor="#6d6a81"
        // needleHeightRatio={20}
        textColor="#6d6a81"
      />
    </>
  );
};

export default GraphicSpeedometer;
