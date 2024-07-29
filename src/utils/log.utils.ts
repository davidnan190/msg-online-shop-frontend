import log from 'loglevel';

const environment = process.env.NODE_ENV || 'dev';

switch (environment) {
  case 'dev':
    log.setLevel('debug');
    break;
  case 'prod':
    log.setLevel('error');
    break;
  default:
    log.setLevel('warn');
    break;
}
export default log;
