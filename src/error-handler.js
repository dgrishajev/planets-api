import { HttpError } from 'http-errors';

const toJSON = ({ message, stack }) => {
  if (process.env.NODE_ENV === 'development') {
    return { message, stack };
  }

  return { message };
};

export default (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { stack } = err;

  if (err instanceof HttpError) {
    return res.status(err.statusCode).send(toJSON(err));
  }

  return res.status(500).send(toJSON({ message: 'Internal server error', stack }));
};
