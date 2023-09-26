import React from 'react';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

const scaleVariants = {
	whileInView: {
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
};

const Header = () => (
	<div className='app__header app__flex'>
		<motion.div
			whileInView={{ x: [-100, 0], opacity: [0, 1] }}
			transition={{ duration: 0.5 }}
			className='app__header-info'
		>
			<div className='app__header-badge'>
				<div className='badge-cmp app__flex'>
					<span>👋</span>
					<div style={{ marginLeft: 20 }}>
						<p className='p-text'>Zilla Tech: Innovate. Create. Achieve.</p>
						<h1 className='head-text'>Your Technology Partner for Innovative Solutions</h1>
					</div>
				</div>

				<div className='tag-cmp app__flex'>
					<p className='p-text'>Zilla Tech is a team of tech enthusiasts driven by innovation and creativity.</p>
					<p className='p-text'>We are passionate about transforming ideas into cutting-edge solutions that help our clients succeed.</p>
				</div>
			</div>
		</motion.div>

		<motion.div
			whileInView={{ opacity: [0, 1] }}
			transition={{ duration: 0.5, delayChildren: 0.5 }}
			className='app__header-img'
		>
			<img src={images.profile} alt='profile_bg' />
			<motion.img
				whileInView={{ scale: [0, 1] }}
				transition={{ duration: 1, ease: 'easeInOut' }}
				src={images.circle}
				alt='profile_circle'
				className='overlay_circle'
			/>
		</motion.div>

		<motion.div
			variants={scaleVariants}
			whileInView={scaleVariants.whileInView}
			className='app__header-circles'
		>
			{[images.python, images.java, images.react].map((circle, index) => (
				<div className='circle-cmp app__flex' key={`circle-${index}`}>
					<img src={circle} alt='profile_bg' />
				</div>
			))}
		</motion.div>
	</div>
);

export default AppWrap(Header, 'home');
