
import User from '../models/user.model.mjs'

export const getUserProfileandRepos  = async(req, res) => {
    const username = req.params.username; 
    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API_KEY}`
            }
        });
          const userProfile = await userRes.json(); 
    
          const resRepos = await fetch(userProfile.repos_url, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API_KEY}`
            }
          }); 
          const repos = await resRepos.json() ; 

          res.status(200).json({userProfile, repos}); 
          return {userProfile, repos}; 
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export const getReposByLanguage = async(req, res) => {
    const language = req.params.language
    try {
        const userres = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API_KEY}`
            }
        })
       
        const data = await userres.json(); 
        res.status(200).json({repos: data.items}); 
        return data.items; 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


export const likeProfile = async(req, res) => {
   
    try {
        const username = req.params.username;
        const user = await User.findById(req.user._id.toString()); 

        const userToLike = await User.findOne({username}); 
        if(!userToLike) {
            return res.status(404).json({message: "Corresponding User is Not Member"}); 
        }

        if(user.likedProfiles.includes(userToLike.username)){
            return res.status(404).json({message: "User Already Liked"}); 
        }

        userToLike.likedBy.push({username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now()})
        user.likedProfiles.push(userToLike.username)
        
        await Promise.all([userToLike,save(), user.save()]); 
        res.status(200).json({message: "user liked"})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export const getLikes = async(req, res) => {
    try {
        const user = await User.findById(req.user._id.toString()); 
        res.status(200).json({likedBy: user.likedBy}); 
        
    } catch (error) {
       res.status(500).json({error: error.message}) 
    }
}












