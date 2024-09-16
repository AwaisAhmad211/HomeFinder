import React from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/Slider'
import { singlePostData, userData } from '../../lib/dummydata'
import pin from '../../assets/pin.png'
import Map from '../../components/map/Map'
import utilityImg from "../../assets/utility.png"
import pet from "../../assets/pet.png"
import feeImg from "../../assets/fee.png"
import sizeImg from "../../assets/size.png"
import bedImg from "../../assets/bed.png"
import bathImg from "../../assets/bath.png"
import schoolImg from "../../assets/school.png"
import petImg from "../../assets/pet.png"
import chatImg from "../../assets/chat.png"
import saveImg from "../../assets/save.png"

const SinglePage = () => {
  return (
    <div className='singlePage'>
      <div className="details">
      <div className="wrapper">
        <Slider images={singlePostData.images}/>
        <div className="info">
          <div className="top">
            <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src={pin} alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">
                  {`$ ${singlePostData.price}`}
                </div>
            </div>
            <div className="user">
              <img src={userData.img} alt="" />
              <span>{userData.name}</span>
            </div>
          </div>
          <div className="bottom">
            <p>{singlePostData.description}</p>
          </div>
        </div>
      </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src={utilityImg} alt="" />
              <div className="featureText">
                <span>Utilities</span>
                Owner is responsible
              </div>
            </div>
            <div className="feature">
              <img src={pet} alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                Pets Allowed
              </div>
            </div>
            <div className="feature">
              <img src={feeImg} alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>Must have 3x the in total household rent</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src={sizeImg} alt="" />
              <span>80 sqft</span>
            </div>
            <div className="size">
              <img src={bedImg} alt="" />
              <span>2 beds</span>
            </div>
            <div className="size">
            <img src={bathImg} alt="" />
              <span>1 bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src={schoolImg} alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                 250m away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src={petImg} alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src={feeImg} alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[]} />
          </div>
          <div className="buttons">
            <button>
              <img src={chatImg} alt="" />
              Send a Message
            </button>
            <button
              style={{
                backgroundColor: "#fece51",
              }}
            >
              <img src={saveImg} alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage
