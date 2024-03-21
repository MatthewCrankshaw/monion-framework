import { Provider } from '@nestjs/common';
import { dataSource } from 'data-source';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    useFactory: () => {
      return dataSource.initialize();
    },
  },
];
