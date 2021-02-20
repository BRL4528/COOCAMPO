import React, { useState, useCallback } from 'react';
// import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import UseAnimations from 'react-useanimations';
import alertCircle from 'react-useanimations/lib/alertCircle';

import FileList from '../../../components/Global/FileList';

import Upload from '../../../components/Global/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

// import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  // const history = useHistory();

  const handleUpload = useCallback(async (): Promise<void> => {
    const data = new FormData();

    if (!uploadedFiles.length) return;

    const file = uploadedFiles[0];

    data.append('file', file.file, file.name);

    try {
      // await api.post('/transactions/import', data);
      console.log(data);
    } catch (err) {
      console.log(err.response.error);
    }
  }, [uploadedFiles]);

  const submitFile = useCallback((files: File[]): void => {
    const uploadFiles = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles(uploadFiles);
  }, []);

  return (
    <>
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <UseAnimations
                animation={alertCircle}
                size={70}
                strokeColor="#f2c811"
                style={{ padding: 50 }}
              />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
