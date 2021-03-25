import React, { useRef, useState, useCallback } from 'react';
import { FiPrinter, FiChevronsDown } from 'react-icons/fi';
import ReactToPrint from 'react-to-print';

import GraphicSpeed from '../../../../components/Global/GraphicModels/GraphicSpeedometer';
import TableGoalsGlobal from '../../../../components/Admin/TableGoalsGlobal';

import {
  Container,
  CardGraphic,
  CardGraphicHeader,
  CardCenter,
} from './styles';

interface ListGoalsOfSectorProps {
  titleText: string;
  subtitle: string;
}

const ListGoalsOfSector: React.FC<ListGoalsOfSectorProps> = ({
  titleText,
  subtitle,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const [grupGoalSelected, setGrupGoalSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handlePrint = useCallback(id => {
    return document.getElementById(id);
  }, []);

  const handleExpand = useCallback(
    (id: string) => {
      setIsOpen(!isOpen);
      const alreadySelected = grupGoalSelected.findIndex(
        (item: string) => item === id,
      );

      if (alreadySelected >= 0) {
        const filteredItems = grupGoalSelected.filter(
          (item: string) => item !== id,
        );

        setGrupGoalSelected(filteredItems);
      } else {
        setGrupGoalSelected([...grupGoalSelected, id]);
      }
    },
    [grupGoalSelected, isOpen],
  );

  const title = {
    text1: '0',
    text2: '1 Sal.Base',
    text3: '1,5 Sal.Base',
    text4: '2 Sal.Base',
  };
  return (
    <Container id="print" ref={componentRef}>
      <div>
        <CardCenter>
          <CardGraphicHeader>
            <header>
              <h3>{titleText}</h3>
              <span>{subtitle}</span>
            </header>

            <div>
              <ReactToPrint
                trigger={() => <FiPrinter className="iconPrint" />}
                content={() => handlePrint('print')}
                documentTitle="NomeSetor"
              />
              <FiChevronsDown
                className={grupGoalSelected.includes('123') ? 'logo' : ''}
                onClick={() => handleExpand('123')}
              />
            </div>
          </CardGraphicHeader>
          <fieldset
            className={grupGoalSelected.includes('123') ? 'selected' : ''}
          >
            <CardGraphic>
              <TableGoalsGlobal />
              <GraphicSpeed title={title} width={320} dataValue={600} />
            </CardGraphic>
          </fieldset>
        </CardCenter>
      </div>
    </Container>
  );
};

export default ListGoalsOfSector;
