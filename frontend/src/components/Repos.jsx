import React from 'react'
import Repo from './Repo'

const Repos = ({repos, alwaysFullWidth = false}) => {
	const size = alwaysFullWidth ? 'w-full': 'lg:w-2/3 w-full'; 
  return (
    <div className={`${size} bg-glass rounded-lg px-8 py-6`}>
			<ol className='relative border-s border-gray-200'>
				
				{
					repos.map((repo, index) => (
					<Repo key = {repo+index} repo = {repo} />
				))}

				{
					repos.length === 0 ? <p className='flex flex-col justify-center items-center text-xl h-1 '>No Repos Found!!</p>: null
				}
			</ol>
		</div>
  )
}

export default Repos
