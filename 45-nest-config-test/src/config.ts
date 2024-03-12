import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import * as path from 'path';

export default async () => {
  const dbPort = await 3306;

  const yarnConfigPath = path.join(process.cwd(), './src/config.yaml');

  const config = await readFile(yarnConfigPath, {
    encoding: 'utf-8',
  });

  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    db: {
      host: 'localhost',
      port: dbPort,
    },
    yamlConfig: yaml.load(config),
  };
};
