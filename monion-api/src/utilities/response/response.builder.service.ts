export const buildResponse = (data: object | object[]): object => {
  return {
    data: {
      ...data,
    },
  };
};
