import { Response, Request } from 'express';

interface ServerRoute {
  routeFunc: (req: Request, res: Response) => {};
  protected: boolean;
  method: 'post' | 'get';
}
