import { useCallback, ChangeEvent, useState } from 'react';
import {
  Button,
  ModalBody,
  ModalFooter,
  Image,
  Center,
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { ModalComponent } from '..';
import { api } from '../../../../services/api';
import { apllyToast } from '../../../Global/Toast2.0';

interface Ifile {
  file: string;
}

interface Props {
  url: string;
  open: boolean;
  handleCloseImage: () => void;
  hadleUpdateTable: (file: Omit<string, ''>) => void;
  idSupply: string;
}

export function ModalVisualizeImage({
  url,
  open,
  handleCloseImage,
  idSupply,
  hadleUpdateTable,
}: Props) {
  const [loading, setLoading] = useState(false);
  const handleReceiptChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
      try {
        if (e.target.files) {
          const data = new FormData();

          data.append('file', e.target.files[0]);
          await api
            .patch<Ifile>(`/supplies/upload/file?id=${idSupply}`, data)
            .then(response => {
              hadleUpdateTable(response.data.file);
              apllyToast('success', 'Comprovante alterado');
              handleCloseImage();
              setLoading(false);
            });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        apllyToast('warning', 'Problemas ao alterar comprovante');
      }
    },
    [hadleUpdateTable, handleCloseImage, idSupply],
  );
  return (
    <>
      <ModalComponent
        title="Comprovante"
        isOpen={open}
        onClose={() => handleCloseImage()}
      >
        <ModalBody>
          <Center flexDirection="column">
            <Image src={url} alt="comprovante" borderRadius="6" />
            <Text mt="2" color="purple.400" as="a" target="_blank" href={url}>
              Visualizar em uma nova aba
            </Text>
          </Center>
          <ModalFooter>
            <Box
              as="label"
              px="3"
              py="2"
              borderRadius="6"
              htmlFor="document"
              bg="orange"
              cursor={loading ? 'not-allowed' : 'pointer'}
              mr="2"
            >
              {loading ? <Spinner size="sm" /> : <Text>Alterar arquivo</Text>}
              <Box
                display="none"
                as="input"
                type="file"
                id="document"
                onChange={handleReceiptChange}
                disabled={loading}
              />
            </Box>

            <Button colorScheme="blue" onClick={() => handleCloseImage()}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalComponent>
    </>
  );
}
