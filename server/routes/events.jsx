import express from 'express';
import authenticate from '../middlewares/authenticate.jsx';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
	res.status(201).json({ success: true });
});

export default router;