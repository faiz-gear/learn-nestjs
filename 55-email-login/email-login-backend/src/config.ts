import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import * as path from 'path';

export default async () => {
  const yarnConfigPath = path.join(process.cwd(), './src/config.yaml');

  const config = await readFile(yarnConfigPath, {
    encoding: 'utf-8',
  });

  return yaml.load(config);
};
