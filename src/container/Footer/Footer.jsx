import React, { useState } from 'react'
import axiosInstance from '../../axios/axios'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import './Footer.scss'

const Footer = () => {
	const [formData, setFormData] = useState({ name: '', email: '', message: '' })
	const [isFormSubmitted, setIsFormSubmitted] = useState(false)
	const [loading, setLoading] = useState(false)

	const { name, email, message } = formData

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = () => {
		setLoading(true)

		const contact = {
			name: name,
			email: email,
			message: message,
		}
		var config = {
			method: 'post',
			url: 'v3/contacts/',
			headers: {
				'Content-Type': 'application/json',
			},
			data: contact,
		}
		axiosInstance(config)
			.then(function (response) {
				setLoading(false)
				setIsFormSubmitted(true)
			})
			.catch((error) => console.log(error))
	}

	return (
		<>
			<h2 className='head-text'>Take a coffee & chat with me</h2>

			<div className='app__footer-cards'>
				<div className='app__footer-card '>
					<img src={images.email} alt='email' />
					<a href='mailto:olukotha@gmail.com' className='p-text'>
						olukotha@gmail.com
					</a>
				</div>
				<div className='app__footer-card'>
					<img src={images.mobile} alt='phone' />
					<a href='tel:+233 (544) 98-1496' className='p-text'>
						+233 (544) 98-1496
					</a>
				</div>
			</div>
			{!isFormSubmitted ? (
				<div className='app__footer-form app__flex'>
					<div className='app__flex'>
						<input
							className='p-text'
							type='text'
							placeholder='Your Name'
							name='name'
							value={name}
							onChange={handleChangeInput}
						/>
					</div>
					<div className='app__flex'>
						<input
							className='p-text'
							type='email'
							placeholder='Your Email'
							name='email'
							value={email}
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<textarea
							className='p-text'
							placeholder='Your Message'
							value={message}
							name='message'
							onChange={handleChangeInput}
						/>
					</div>
					<button type='button' className='p-text' onClick={handleSubmit}>
						{!loading ? 'Send Message' : 'Sending...'}
					</button>
				</div>
			) : (
				<div>
					<h3 className='head-text'>Thank you for getting in touch!</h3>
				</div>
			)}
		</>
	)
}

export default AppWrap(
	MotionWrap(Footer, 'app__footer'),
	'contact',
	'app__whitebg'
)
