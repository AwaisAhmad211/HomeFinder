import React from 'react'
import './card.scss'
import { Link } from 'react-router-dom'
import pin from '../../assets/pin.png'
import bed from '../../assets/bed.png'
import bath from '../../assets/bath.png'
import save from '../../assets/save.png'
import chat from '../../assets/chat.png'

const Card = ({item}) => {
  return (
    <div className='card'>
      <div className="imageContainer">
        <Link>
           <img src={item.image} alt={item.id} />
        </Link>
        </div>
      <div className="textContainer">
        <div className="top">
         <Link ><h1 className='title'>{item.title}</h1></Link>
          <div className="address">
            <img src={pin} alt="pin" />
            <span>{item.address}</span>
          </div>
          <span className='price'>{`$${item.price}`}</span>
        </div>
        <div className="bottom">
          <div className="features">
              <div className="feature">
                <img src={bed} alt="bedImg" />
                <span>{`${item.bedroom} bedrooms`}</span>
              </div>
              <div className="feature">
                <img src={bath} alt="bathImg" />
                <span>{`${item.bathroom} bathroom`}</span>
              </div>
          </div>
          <div className="right">
            <div className="icon">
            <img src={save} alt="saveImg" />
            </div>
            <div className="icon">
            <img src={chat} alt="saveImg" />
            </div>
               
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card