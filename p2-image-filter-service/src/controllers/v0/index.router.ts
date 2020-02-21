import { Router, Request, Response } from 'express';
import { ImageRouter } from './image/routes/image.router';

const router: Router = Router();

router.use('/image', ImageRouter);

// V0 root endpoint
router.get('/', async (req: Request, res: Response) => {    
    res.status(200).json({
        status: "OK",
        message: "try GET image/filteredimage?image_url={{}}"
    });
});

export const IndexRouter: Router = router;