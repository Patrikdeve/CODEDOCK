
import express from 'express'
import { getUserProfileandRepos } from '../controller/userProfile.mjs';
import { checkAuthentication } from '../middleware/checkAuthentication.mjs';
import { likeProfile } from '../controller/userProfile.mjs';
import { getLikes } from '../controller/userProfile.mjs';

const router = express.Router(); 


router.route('/profile').get( (req, res) => {
    
    res.send('User profile is Ready'); 
})

router.get('/profile/:username', getUserProfileandRepos)

router.get('/likes', checkAuthentication, getLikes); 
router.post('/like/:username', checkAuthentication, likeProfile); 

export default router; 