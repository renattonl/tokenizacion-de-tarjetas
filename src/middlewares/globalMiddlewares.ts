
import errorLoggerMiddleware from '@middy/error-logger';
import httpErrorHandlerMiddleware from '@middy/http-error-handler';
import httpJsonBodyParserMiddleware from '@middy/http-json-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer'
import httpCorsMiddleware from '@middy/http-cors';
import httpSecurityHeadersMiddleware from '@middy/http-security-headers';
import { customHttpErrorMiddleware } from './customHttpError.middleware';
import { validTokenMiddleware } from './validToken.middleware';

export default [
  httpCorsMiddleware(),
  httpSecurityHeadersMiddleware(),
  httpJsonBodyParserMiddleware(),
  validTokenMiddleware(),
  errorLoggerMiddleware(),
  httpErrorHandlerMiddleware(),
  customHttpErrorMiddleware(),
  httpResponseSerializer({
    serializers: [
      {
        regex: /^application\/xml$/,
        serializer: ({ body }) => `<message>${body}</message>`,
      },
      {
        regex: /^application\/json$/,
        serializer: ({ body }) => JSON.stringify(body)
      },
      {
        regex: /^text\/plain$/,
        serializer: ({ body }) => body
      }
    ],
    defaultContentType: 'application/json'
  }),
];