import React, { useState, useCallback, useRef } from 'react';
// import { useHistory } from 'react-router-dom';
import { useLoading, Oval } from '@agney/react-loading';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import filesize from 'filesize';

import UseAnimations from 'react-useanimations';
import alertCircle from 'react-useanimations/lib/alertCircle';

import { useToast } from '../../../hooks/toast';

import FileList from '../../../components/Global/FileList';
import Button from '../../../components/Global/Button';
import Select from '../../../components/Global/Select';

import Upload from '../../../components/Global/Upload';

import {
  Container,
  ImportFileContainer,
  Footer,
  CardHeader,
  DivLeft,
} from './styles';
import api from '../../../services/api';

// import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  // const history = useHistory();

  const [loadDash, setLoadDash] = useState(false);

  const { containerProps, indicatorEl } = useLoading({
    loading: loadDash,
    indicator: <Oval />,
  });

  const handleUpload = useCallback(
    async (routeApi): Promise<void> => {
      const data = new FormData();

      setLoadDash(!loadDash);

      if (!uploadedFiles.length || routeApi.model === '') {
        addToast({
          type: 'info',
          title: 'Informações ausentes',
          description:
            'Adicione o arquivo ou selecione o modelo de importação.',
        });
        setLoadDash(false);
        return;
      }

      const file = uploadedFiles[0];

      data.append('file', file.file, file.name);

      try {
        await api.post(routeApi.model, data);

        addToast({
          type: 'success',
          title: 'Arquivo importado',
          description: 'Sucesso ao importar o arquivo.',
        });
      } catch (err) {
        console.log(err.response.error);
        addToast({
          type: 'error',
          title: 'Erro ao importar arquivo',
          description: 'Não foi possivel importar o arquivo.',
        });
      }
      setLoadDash(false);
    },
    [addToast, loadDash, uploadedFiles],
  );

  const submitFile = useCallback((files: File[]): void => {
    const uploadFiles = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles(uploadFiles);
  }, []);

  const options = [
    { value: '/employees/import', label: 'Colaborador-SQL1' },
    { value: '/sage2', label: 'Colaborador-SQL2' },
    { value: '/sage3', label: 'Colaborador-SQL3' },
    { value: '/goals/import', label: 'Metas-Geinfo' },
    { value: '/results-of-goals/import', label: 'Realizados-Geinfo' },
  ];

  return (
    <>
      <CardHeader>
        <div>
          <h2>Importar arquivos</h2>
          <strong>Importe todos os dados necessarios aqui.</strong>
        </div>
      </CardHeader>
      <Container>
        <ImportFileContainer>
          <Form ref={formRef} onSubmit={handleUpload}>
            <Upload onUpload={submitFile} />
            {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

            <Footer>
              <span>
                <UseAnimations
                  animation={alertCircle}
                  size={40}
                  strokeColor="#f2c811"
                  style={{ padding: 50 }}
                />
                Permitido apenas arquivos CSV
              </span>
            </Footer>

            <p>Selecione o modelo de importação</p>

            <Select name="model" options={options} />
            <DivLeft>
              <Button
                className={loadDash ? 'styleLoadButton' : ''}
                disabled={loadDash}
                type="submit"
              >
                {loadDash ? (
                  <div {...containerProps} ref={componentRef}>
                    {indicatorEl}
                  </div>
                ) : (
                  <>Enviar</>
                )}
              </Button>
            </DivLeft>
          </Form>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
