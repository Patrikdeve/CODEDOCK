import React, { useCallback, useEffect, useState } from 'react'
import {Search, SortRepos, ProfileInfo,Repos} from '../components/index.jsx'
import {toast} from 'react-hot-toast'
import Spinner from '../components/Spinner.jsx'



const HomePage = () => {

  const token = import.meta.env.VITE_APP_GITHUB_TOKEN;
  
  const [ userProfile, setUserProfile] = useState(null); 
  const [repos, setRepos] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const [sortType, setSortType] = useState("recent"); 

  //to avoid infinite loop errors just avoided the direct function rather used the useCallBack Function
  const getUserProfileandRepos = useCallback(async(username = "Patrikdeve") => {
    setLoading(true); 
    try{

      const userRes = await fetch(`/api/users/profile/${username}`)
        
      const {userProfile, repos} = await userRes.json(); 

      setRepos(repos); 
      setUserProfile(userProfile); 
     

    }catch(error) {
      toast.error('No User Found'); 
    }finally{
      setLoading(false);
    }
  }, [])

  useEffect(() => {

    getUserProfileandRepos(); 
  }, [getUserProfileandRepos])


  const onSearch = async(e,username) => {
    e.preventDefault();

		setLoading(true);
		setRepos([]);
		setUserProfile(null);

		const { userProfile, repos } = await getUserProfileandRepos(username);

		setUserProfile(userProfile);
		setRepos(repos);
		setLoading(false);
  }

  const onSort = (sortType) => {
    if(sortType === "recent")
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    else if(sortType === "stars") 
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count); 
    else if(sortType === "forks") 
        repos.sort((a, b) => b.forks_count - a.forks_count); 
    
    setSortType(sortType);
    setRepos([...repos]); 
  }

  return (
    <div className='m-4'>
        <Search onSearch = {onSearch}/>
        {repos?.length > 0 && <SortRepos sortType = {sortType} onSort = {onSort}/>}

        <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
            {userProfile && !loading && <ProfileInfo userProfile = {userProfile}/>}
            {!loading && <Repos repos = {repos} />}
            {loading && (
              <Spinner />
            )}
        </div> 
    </div>
  )
}

export default HomePage
