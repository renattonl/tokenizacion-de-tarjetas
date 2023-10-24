import type {Config} from 'jest';

const config: Config = {
  rootDir: './src/tests',
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  }
};

export default config;