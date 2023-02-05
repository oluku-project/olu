import React, { useState, useEffect } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { motion } from 'framer-motion'

import { AppWrap, MotionWrap } from '../../wrapper'
import './Testimonial.scss'
import axiosInstance from '../../axios/axios'

const Testimonial = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [testimonials, setTestimonials] = useState([])
	const [brands, setBrands] = useState([])

	const handleClick = (index) => {
		setCurrentIndex(index)
	}

	useEffect(() => {
		var config = {
			method: 'get',
			url: 'v3/testimonials/',
			headers: {
				'Content-Type': 'application/json',
			},
		}

		axiosInstance(config).then((data) => {
			setTestimonials([...data.data])
		})

		var config = {
			method: 'get',
			url: 'v3/brands/',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		axiosInstance(config).then((data) => {
			setBrands([...data.data])
		})
	}, [])

	const test = testimonials[currentIndex]
	return (
		<>
			{testimonials.length && (
				<>
					<div className='app__testimonial-item app__flex'>
						<img src={test.imageurl} alt={test.name} />
						<div className='app__testimonial-content'>
							<p className='p-text'>{test.feedback}</p>
							<div>
								<h4 className='bold-text'>{test.name}</h4>
								<h5 className='p-text'>{test.company}</h5>
							</div>
						</div>
					</div>

					<div className='app__testimonial-btns app__flex'>
						<div
							className='app__flex'
							onClick={() =>
								handleClick(
									currentIndex === 0
										? testimonials.length - 1
										: currentIndex - 1
								)
							}
						>
							<HiChevronLeft />
						</div>

						<div
							className='app__flex'
							onClick={() =>
								handleClick(
									currentIndex === testimonials.length - 1
										? 0
										: currentIndex + 1
								)
							}
						>
							<HiChevronRight />
						</div>
					</div>
				</>
			)}

			<div className='app__testimonial-brands app__flex'>
				{brands.map((brand) => (
					<motion.div
						whileInView={{ opacity: [0, 1] }}
						transition={{ duration: 0.5, type: 'tween' }}
						key={brand.id}
					>
						<img src={brand.imageurl} alt={brand.name} />
					</motion.div>
				))}
			</div>
		</>
	)
}

export default AppWrap(
	MotionWrap(Testimonial, 'app__testimonial'),
	'testimonial',
	'app__primarybg'
)
