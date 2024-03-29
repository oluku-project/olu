import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axiosInstance from '../../axios/axios'
import { AppWrap, MotionWrap } from '../../wrapper'
import './About.scss'

const About = () => {
	const [abouts, setAbouts] = useState([])

	useEffect(() => {
		var config = {
			method: 'get',
			url: 'v3/abouts/',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		axiosInstance(config).then((data) => {
			setAbouts(data.data)
		})
	}, [])

	return (
		<>
			<h2 className='head-text'>
				We Know that <span>Good Design</span> <br />
				means <span>Good Business</span>
			</h2>

			<div className='app__profiles'>
				{abouts.map((about, index) => (
					<motion.div
						whileInView={{ opacity: 1 }}
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.5, type: 'tween' }}
						className='app__profile-item'
						key={about?.title + index}
					>
						<img src={about?.imageurl} alt={about?.title} />
						<h2 className='bold-text' style={{ marginTop: 20 }}>
							{about.title}
						</h2>
						<p className='p-text' style={{ marginTop: 10 }}>
							{about?.description}
						</p>
					</motion.div>
				))}
			</div>
		</>
	)
}

export default AppWrap(MotionWrap(About, 'app__about'), 'about', 'app__whitebg')
