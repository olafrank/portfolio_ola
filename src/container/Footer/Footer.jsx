import React,{useState} from 'react';

import { images } from '../../constants'
import { client } from '../../client'
import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';

const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) =>{
   const { name, value} = e.target;  //get the name 

   setFormData({...formData, [name]: value}); //adavnce react
  }

  const handleSubmit = () =>{
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email:email,
      message: message,
    }

    client.create(contact)    ///to send form to database which is sanityIo
    .then(() =>{
     setLoading(false);
     setIsFormSubmitted(true);
    })
  }


  return (
    <>
      <h2 className="head-text">Let Me get it Handled Chat Me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:olalereomidire@gmail.com" className='p-text'> olalereomidire@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="email" />
          <a href="tel:+2348030587736" className='p-text'> +2348030587736</a>
        </div>
      </div>

      {!isFormSubmitted ?
      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input type="text" name="name" className='p-text' placeholder='Your Name' value={name} onChange={handleChangeInput}  />
        </div>
        <div className="app__flex">
          <input type="email" name="email" className='p-text' placeholder='Your Email' value={email} onChange={handleChangeInput}  />
        </div>
        <div>
          <textarea className='p-text' placeholder='your message' value={message} name='message'
            onChange={handleChangeInput}  />
        </div>
        <button className="p-text" type='button' onClick={handleSubmit}>{loading ? 'sending' : 'Send Message'} </button>
      </div>
      : 
      <div>
        <h3 className="head-text">
          Thank Your For getting in touch
        </h3>
      </div> }

    </>


















  )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg');