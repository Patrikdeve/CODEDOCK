
import express from 'express'; 
import { getReposByLanguage } from '../controller/userProfile.mjs';
import { checkAuthentication } from '../middleware/checkAuthentication.mjs';

const router = express.Router(); 


router.get('/repos/:language', checkAuthentication, getReposByLanguage); 


export default router; 