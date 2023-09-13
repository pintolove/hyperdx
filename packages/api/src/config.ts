import { version } from '../package.json';

const env = process.env;

export const CODE_VERSION = version;

export const APP_TYPE = env.APP_TYPE as 'api' | 'aggregator' | 'scheduled-task';

export const NODE_ENV = env.NODE_ENV as string;
export const IS_PROD = NODE_ENV === 'production';
export const IS_DEV = NODE_ENV === 'development';
export const IS_CI = NODE_ENV === 'ci';

export const PORT = Number.parseInt(env.PORT as string);
export const SERVER_URL = env.SERVER_URL as string;
export const FRONTEND_URL = env.FRONTEND_URL as string;
export const COOKIE_DOMAIN = env.COOKIE_DOMAIN as string; // prod ONLY

export const MONGO_URI = env.MONGO_URI as string;

export const CLICKHOUSE_HOST = env.CLICKHOUSE_HOST as string;
export const CLICKHOUSE_PASSWORD = env.CLICKHOUSE_PASSWORD as string;
export const CLICKHOUSE_USER = env.CLICKHOUSE_USER as string;

export const HYPERDX_API_KEY = env.HYPERDX_API_KEY as string;
export const HYPERDX_INGESTOR_ENDPOINT =
  env.HYPERDX_INGESTOR_ENDPOINT as string;

export const EXPRESS_SESSION_SECRET = env.EXPRESS_SESSION_SECRET as string;

export const REDIS_URL = env.REDIS_URL as string;

export const MINER_API_URL = env.MINER_API_URL as string;

export const OTEL_SERVICE_NAME = env.OTEL_SERVICE_NAME as string;
