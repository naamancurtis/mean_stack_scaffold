import { Router } from 'express';
import cors from 'cors';
import parser from 'body-parser';

export const handleCors = (router: Router): void => {
  router.use(cors({ credentials: true, origin: true }));
};

export const handleBodyRequestParsing = (router: Router): void => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};
