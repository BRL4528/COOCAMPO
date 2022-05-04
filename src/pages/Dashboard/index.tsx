import { Center } from '@chakra-ui/react';
import { CardList } from '../../components/Global/CardList';
import Maps from '../../components/Global/Maps';

const Dashboard = () => {
  return (
    <Center flexDirection="column">
      <CardList />
      <Maps />
    </Center>
  );
};

export default Dashboard;
