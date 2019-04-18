export const normalizePort = (val: number | string): number => {
    return (typeof val === 'string') ? parseInt(val) : val;
};

export const handleError = (error: Error) => {
    const errorMessage: string = `${error.name}: ${error.message}`;
    const env: any = process.env.NODE_ENV;
    if (env !== 'test' && env !== 'pipelines') { console.log(errorMessage); }
    return Promise.reject(new Error(errorMessage));
};

export const throwError = (condition: boolean, message: string): void => {
    if (condition) { throw new Error(message); }
};

export const JWT_SECRET: string = 'pmz';