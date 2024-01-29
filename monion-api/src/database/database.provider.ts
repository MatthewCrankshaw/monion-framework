import { Provider } from '@nestjs/common';
import { dataSource } from 'migrate';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    useFactory: () => {
      return dataSource.initialize();
    },
  },
];
