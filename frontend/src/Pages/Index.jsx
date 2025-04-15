import React from 'react';
import "./index.css";
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../Image/Index07.jpg';
import img2 from '../Image/Index02.jpg';
import img3 from '../Image/Index03.jpeg';
import img4 from '../Image/Index04.jpg';
import img5 from '../Image/Index05.jpeg';
import img6 from '../Image/Index06.jpeg';
import img7 from '../Image/Index01.jpg';
import img8 from '../Image/Index08.jpg';
import FrontNav from '../Component/FrontNav';
import FrontFooter from '../Component/FrontFooter';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <div className='first'>
            <FrontNav />
            <Carousel>
                { [img1, img2, img3, img4, img5, img6, img7, img8].map((img, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100 carousel-img"
                            src={img}
                            alt={`Slide ${index + 1}`}
                        />
                    </Carousel.Item>
                )) }
            </Carousel>
            <div className='screen-btn'>
                {/*<Link className='req' to='/contact'>
                    <button type="submit" className='req'>Contact Us <FaArrowRight /></button>
                </Link>*/}
                <Link className='don' to='/login'>
                    <button type="submit" className='don'>Donate Blood <FaArrowRight /></button>
                </Link>
            </div>
            <FrontFooter />
        </div>
    );
}

export default Index;
