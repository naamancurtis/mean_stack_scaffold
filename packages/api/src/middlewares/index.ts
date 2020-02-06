import { handleBodyRequestParsing, handleCors } from './common.middleware';
import handleAPIdocs from './api-docs.middleware';

export default [handleCors, handleBodyRequestParsing, handleAPIdocs];
