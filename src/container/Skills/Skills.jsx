import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { AppWrap, MotionWrap } from '../../wrapper'
import './Skills.scss'
import axiosInstance from '../../axios/axios'

const Skills = () => {
	const [experiences, setExperiences] = useState([])
	const [skills, setSkills] = useState([])

	useEffect(() => {
		var config = {
			method: 'get',
			url: 'v3/experiences/',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		axiosInstance(config).then((data) => {
			setExperiences([...data.data])
		})
		var config = {
			method: 'get',
			url: 'v3/skills/',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		axiosInstance(config).then((data) => {
			setSkills([...data.data])
		})
	}, [])

	return (
		<>
			<h2 className='head-text'>Skills & Experiences</h2>

			<div className='app__skills-container'>
				<motion.div className='app__skills-list'>
					{skills.map((skill) => (
						<motion.div
							whileInView={{ opacity: [0, 1] }}
							transition={{ duration: 0.5 }}
							className='app__skills-item app__flex'
							key={skill.name}
						>
							<div
								className='app__flex'
								style={{ backgroundColor: skill.bgColor }}
							>
								<img src={skill.icon} alt={skill.name} />
							</div>
							<p className='p-text'>{skill.name}</p>
						</motion.div>
					))}
				</motion.div>
				<div className='app__skills-exp'>
					{experiences.map((experience) => (
						<motion.div className='app__skills-exp-item' key={experience.year}>
							<div className='app__skills-exp-year'>
								<p className='bold-text'>{experience.year}</p>
							</div>
							<motion.div className='app__skills-exp-works' id=''>
								{experience.works.map((work) => (
									<React.Fragment key={work.name}>
										<motion.div
											whileInView={{ opacity: [0, 1] }}
											transition={{ duration: 0.5 }}
											className='app__skills-exp-work'
											data-tip
											id={`${work.name}-${experience.year}`}
										>
											<h4 className='bold-text'>{work.name}</h4>
											<p className='p-text'>{work.company}</p>
										</motion.div>
										<Tooltip
											anchorId={`${work.name}-${experience.year}`}
											effect='solid'
											arrowColor='#fff'
											className='skills-tooltip'
										>
											{work.desc}
										</Tooltip>
									</React.Fragment>
								))}
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</>
	)
}

export default AppWrap(
	MotionWrap(Skills, 'app__skills'),
	'skills',
	'app__whitebg'
)
