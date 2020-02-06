import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocs from '../swagger.json';

const handleAPIdocs = (router: Router): void => {
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default handleAPIdocs;
