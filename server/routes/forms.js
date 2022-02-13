import express from 'express';

import { getForm, createForm, updateForm, deleteForm } from '../controllers/forms.js';

const router = express.Router();

// get the middleware
import auth from "../middleware/auth.js";

// Get routes from controllers
router.get('/', getForm);
router.post('/', auth, createForm);  // in order to create, need to be a valid user
router.patch('/:id', auth, updateForm)  // update form tat the user created (frontend)
router.delete('/:id', auth, deleteForm); // delete form tat the user created (frontend)
//router.patch('/:id/likeListing', auth, likeForm); // only like once for the specified id (backend)

export default router; 