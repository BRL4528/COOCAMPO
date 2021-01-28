/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { Report } from 'powerbi-report-component';
import { useReactToPrint } from 'react-to-print';

// import { FiPrinter } from 'react-icons/fi';
// import Carousel from '@brainhubeu/react-carousel';

// import CardGraphic from '../../components/GraphicModels/CardGraphic';

// import GraphicBar from '../../components/GraphicModels/GraphicBar';
// import GraphicPie from '../../components/GraphicModels/GraphicPie';
// import GraphicLine from '../../components/GraphicModels/GraphicLine';
// import GraphicPie from '../../components/GraphicModels/GraphicChartPie';
// import GraphicBump from '../../components/GraphicModels/GraphicBump';

import {
  Conatiner,
  // CardItem,
  // GraphicTitle,
  // CardGraphicText,
  // CardGraphicItem,
  // CardBodyGoals,
} from './styles';

// interface PropsArray {
//   name: string;
// }

const Dashboard: React.FC = (onRequest, ref) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const array = [];
  const temp1 = {
    name: 'Matriz',
    valor: '2',
    border: '#7fdaea',
    backcolor: '#f1fafc',
    data: [2.5, 2, 3, 2.5, 2, 3.5, 1],
    labels: ['12', '10', '15', '12', '10', '15'],
  };
  const temp2 = {
    name: 'UPL I',
    valor: '3',
    border: '#fed87e',
    backcolor: '#fdfaf1',
    data: [12, 19, 15, 14, 12, 9, 5],
    labels: ['12', '10', '15', '12', '10', '15'],
  };
  const temp3 = {
    name: 'Crechario',
    valor: '4',
    border: '#8ae0b7',
    backcolor: '#f1fbf7',
    data: [2.5, 2.0, 1, 2],
    labels: ['12', '19', '8', '10'],
  };
  const temp4 = {
    name: 'Confinamento',
    valor: '5',
    border: '#fea8ba',
    backcolor: '#fdf3f5',
    data: [12, 13, 10, 10],
    labels: ['12', '19', '30', '10'],
  };
  const temp5 = {
    name: 'Veterinaria',
    valor: '6',
    border: '#fea8ba',
    backcolor: '#fdf3f5',
    data: [10, 11, 15, 10],
    labels: ['12', '19', '30', '10'],
  };
  array.push(temp1);
  array.push(temp2);
  array.push(temp3);
  array.push(temp4);
  array.push(temp5);

  const layoutSettings = {
    width: '100%',
    border: '1px solid #fff',
    // height: '100%',
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Conatiner ref={componentRef}>
        {/* <FiPrinter onClick={handlePrint} /> */}

        <Report
          tokenType="Embed" // "Aad"
          accessToken="H4sIAAAAAAAEACWTxw6sWAJD_-VtGYmcRuoFORU5FLAjh4JLKHJr_n1K3Xsv7GP77z9Odg9TVv7575-4paZGmqdMcNXmflCmX4vBqOGk4p3gcr-UGCdhSeI6JEqn_MlYWpi9u3kn20rj3eQi51CJZ1xMX8jmYfrI-oBq3FQZl1hD8kIlVN2zNZgQ5arDSZoCJzeJJHizqSdfjN4OT0ENi4VKwAo8oWykC611x09JwyFJc3JqpnpiObaWhpcXBfuODIQwDT4mlf0qULbl0tQLqazdyOgRVGfjjDyjAqqCZOqgK6YZj3s3UBUfaJ9HxiCUQvSQ99DgdefSIGszSoTj34YYAXDwxP3KM7HRW2VbltutA5YrYLJ0gJQHrxoOH8I4FpMI8IBvqgl_QRzY2zqLZV_n_MKID9IB0P69dI5wzIoZT7eoz635RdxY7zqwAz4IWHpQmDpez3cPFad4PtOklJgRqR8u49-7orYJUqWixUOeKxcPRoQXL0vws-VS8JGd0iBpxiK8dWqy1UsjP6mZTAUYLGCc0TqzMOcAooXe9n-mFna0F594mXmU-kN-294cletrEvy2oqWoI3TtB8yQpbNVA74Fhyf8uoYUA4DWC1vYkNtFh8xarc6gf89UZQ4-fhA6ZCz0XBE0oS95vCPGCzF33EyuEaJA41C3FC1axN6P5ehMcsSLmOiCoQVt2L6QHta3GwknZ7_tJNPEy-AoqQ7wKiStDYGLTQ0H4RAdiqUCAnDAgvugQs85F7iIIshtW90Zvz7RRzD1fEY1oJGUQIiDOiMfoMW0D9dJaomfXlMi3txhjerl8NG4svjrz3_-COs9b5NR3b_pv6xajOeT85UxIAm3gCa3k9G8sQ17luqzaGNnR3rTDkL0neOJcRDrq0CwKg3QXmdfHHF4MDoR0H5oi7OLwK0f4UyIaVDyhEMOdZxUwTt3ttR0Ns7N3aobWuFxtnsLOj8JNAqxTr26ZhIkAIKWsSs9vCQCi4RpLhAFjauKIW5vV5Twpt4LzdqGyYF0oOtnbpsLnaJY3FmY3B7i-6VcPZWtRJN6q-B9p6-5ru9ZeBQ72VfkqOzis4JzYlDN1y8D9T1qyixRWeXHnmgQtVCql18JczUGREPDdV9NZcfc_N751X2wy7rqdSRRgi3z9ysjWy5MLg_QqD-ZpDUAGHBeoUnTd6q4v_7BfM9ttWrRjzKbADn_9FZ3YHHJj8VvSUf0r8rvGpBt-1r9ZOrba4WWslxTr7X-6Hu9rp9B--B-xPQa_IQYIYiGp4iBpKMaXn6UNMX2DsrMw2UUmtqTe4rneDTvS7HFz-lX4vUwtysE41ataBSGA39eQ9bKa7-WyVI1oqBfJm4daWFm3xipkV6tft_Mpivc2eg2jPw-GE8cZTs66A2eq2VhmEo-7wwlKuVZLsxwnLdznFv68OlF3UpHSJY22Ss0YJh_H_nbQq5i5-MIfrHv2ZFpDmuQ9Yo68go2zqWVigzx1-_g3pfftK6v_LcNAAlgDue07uPu3BosRBfIk-komsap53yoSh3ExOHYkJ6lRtJkH6qzQZF2XyRAYga4aZYXyQRRJx7L5w_z__4Pj7Nt3-4FAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19" // accessToken goes here
          embedUrl="https://app.powerbi.com/reportEmbed?reportId=c6216fce-c528-4600-b8f0-3510d25b0ce8&groupId=9ab7f913-45e8-4e73-abf4-33ff01c21f9f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d" // embedUrl goes here
          embedId="c6216fce-c528-4600-b8f0-3510d25b0ce8" // report or dashboard Id goes here
          // pageName="Sentiment" // set as current page of the report
          reportMode="View" // open report in a particular mode View/Edit/Create
          // datasetId={datasetId} // required for reportMode = "Create" and optional for dynamic databinding in `report` on `View` mode
          // groupId={groupId} // optional. Used when reportMode = "Create" and to chose the target workspace when the dataset is shared.
          // extraSettings={extraSettings}
          style={layoutSettings}
          permissions="All"
        />
        {/* <Carousel>
          <CardItem>
            {array.map(ar => (
              <CardGraphic
                key={ar.valor}
                backcolor={ar.backcolor}
                border={ar.border}
                name={ar.name}
                data={ar.data}
                labels={ar.labels}
              />
            ))}
          </CardItem>
        </Carousel>

        <CardBodyGoals>
          <CardGraphicItem>
            <CardGraphicText>
              <GraphicTitle>Desempenho mensal</GraphicTitle>
              <span>
                <FiEdit />
                <FiPrinter />
                <FiMaximize />
              </span>
            </CardGraphicText>
            <GraphicLine />
          </CardGraphicItem>

          <CardGraphicItem>
            <CardGraphicText>
              <GraphicTitle>Desempenho mensal</GraphicTitle>
              <span>
                <FiEdit />
                <FiPrinter />
                <FiMaximize />
              </span>
            </CardGraphicText>
            <GraphicPie />
          </CardGraphicItem>
        </CardBodyGoals> */}
      </Conatiner>
    </>
  );
};

export default Dashboard;
