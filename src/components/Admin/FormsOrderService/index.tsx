/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from 'react';

import { Container, ContainerMaster } from './styles';

const FormsOrderServices: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      const input = document.getElementById('form-container');

      console.log(input);
    }, 3000);
  }, []);
  return (
    <>
      <ContainerMaster>
        <Container>
          <iframe
            width="640px"
            height="480px"
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=Vkun6QjAEUSWFgp_F-EtrZe4RgxS4qRPn-7cWOyHEotUNk9EUTZXUzM4RDkwQldYV1NJVzVET0tXNi4u&embed=true"
            frameBorder="0"
            allowFullScreen
          />
        </Container>
        <input className="teste" />
      </ContainerMaster>
    </>
  );
};

export default FormsOrderServices;
