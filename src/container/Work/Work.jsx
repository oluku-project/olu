import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import axiosInstance from '../../axios/axios';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Work.scss';

const Work = () => {
	const [works, setWorks] = useState([]);
	const [filterWork, setFilterWork] = useState([]);
	const [activeFilter, setActiveFilter] = useState('All');
	const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

	useEffect(() => {
		var config = {
			method: 'get',
			url: 'v3/works/',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		axiosInstance(config).then((data) => {
			[...data.data].filter((itm) => {
				let newData;
				itm.tags.filter((v) => {
					if (v.tag.includes('All')) {
						newData = itm;
					}
				});
				return newData;
			});
			setWorks([...data.data]);
			setFilterWork([...data.data]);
		});
	}, []);

	const handleWorkFilter = (item) => {
		setActiveFilter(item);
		setAnimateCard([{ y: 100, opacity: 0 }]);

		setTimeout(() => {
			setAnimateCard([{ y: 0, opacity: 1 }]);

			if (item === 'All') {
				setFilterWork(works);
			} else {
				setFilterWork(
					works.filter((work) => {
						let newData;
						// console.log('work: ', work.tags[0].tag)
						work.tags.filter((v) => {
							if (v.tag.includes(item)) {
								newData = work;
							}
						});
						return newData;
					})
				);
			}
		}, 500);
	};

	return (
		<>
			<h2 className='head-text'>
				My Creative <span>Portfolio</span> Section
			</h2>

			<div className='app__work-filter'>
				{['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map(
					(item, index) => (
						<div
							key={index}
							onClick={() => handleWorkFilter(item)}
							className={`app__work-filter-item app__flex p-text ${
								activeFilter === item ? 'item-active' : ''
							}`}
						>
							{item}
						</div>
					)
				)}
			</div>

			<motion.div
				animate={animateCard}
				transition={{ duration: 0.5, delayChildren: 0.5 }}
				className='app__work-portfolio'
			>
				{filterWork.map((work, index) => (
					<div className='app__work-item app__flex' key={index}>
						<div className='app__work-img app__flex'>
							<img src={work?.imageurl} alt={work?.name} />

							<motion.div
								whileHover={{ opacity: [0, 1] }}
								transition={{
									duration: 0.25,
									ease: 'easeInOut',
									staggerChildren: 0.5,
								}}
								className='app__work-hover app__flex'
							>
								<a href={work.projectLink} target='_blank' rel='noreferrer'>
									<motion.div
										whileInView={{ scale: [0, 1] }}
										whileHover={{ scale: [1, 0.9] }}
										transition={{ duration: 0.25 }}
										className='app__flex'
									>
										<AiFillEye />
									</motion.div>
								</a>
								<a href={work.codeLink} target='_blank' rel='noreferrer'>
									<motion.div
										whileInView={{ scale: [0, 1] }}
										whileHover={{ scale: [1, 0.9] }}
										transition={{ duration: 0.25 }}
										className='app__flex'
									>
										<AiFillGithub />
									</motion.div>
								</a>
							</motion.div>
						</div>

						<div className='app__work-content app__flex'>
							<h4 className='bold-text'>{work.title}</h4>
							<p className='p-text' style={{ marginTop: 10 }}>
								{work.description}
							</p>

							<div className='app__work-tag app__flex'>
								<p className='p-text'>{work.tags[0].tag}</p>
							</div>
						</div>
					</div>
				))}
			</motion.div>
		</>
	);
};

export default AppWrap(
	MotionWrap(Work, 'app__works'),
	'work',
	'app__primarybg'
);
