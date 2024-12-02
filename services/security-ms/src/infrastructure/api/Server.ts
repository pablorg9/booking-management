import 'module-alias/register';
import './controllers/index';

import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from '@setup';

import { errorMiddleware, middlewares } from '@infrastructure/api/middlewares';

const server = new InversifyExpressServer(container);

// Middlewares
server.setConfig((app) => {
    app.use('/api/v1', app._router);
    middlewares(app);
    app.use('/api/v1/healthcheck', (_req, res) => {
        res.status(200).json({
            timestamp: Date.now(),
            status: 'healthy',
        });
    });
});

// Middleware error
server.setErrorConfig((app) => {
    app.use(errorMiddleware);
});

const port = process.env.PORT || 8080;

const application = server.build();
application.listen(port, () => {
    console.log(`Application running on port ${port}`);
});

application.on('error', (e) => {
    console.log(`Application crashed: ${e}`);
    process.exit(0);
});
