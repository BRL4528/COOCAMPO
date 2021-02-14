import React from 'react';

import ReactSpeedometer from 'react-d3-speedometer';

interface PropsSpeed {
  dataValue: number;
}

const GraphicSpeedometer: React.FC<PropsSpeed> = dataValue => {
  return (
    <>
      <ReactSpeedometer
        value={dataValue.dataValue}
        // maxSegmentLabels={2}
        // segments={10}
        width={220}
        paddingHorizontal={5}
        paddingVertical={5}
        // startColor="#1c9cd9"
        currentValueText={`${dataValue.dataValue}%`}
        segmentColors={[
          '#f1605b',
          'hsl(58.98305084745763, 100%, 65.29411764705883%)',
          'hsl(96.06741573033706, 100%, 65.09803921568627%)',
        ]}
        customSegmentStops={[0, 250, 750, 1000]}
        customSegmentLabels={[
          {
            text: 'Ruim',
            // position: 'OUTSIDE',
            color: '#6d6a81',
          },
          {
            text: 'Bom',
            // position: 'OUTSIDE',
            color: '#6d6a81',
          },
          {
            text: 'Otimo!',
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
