import React from 'react';
import './listPage.scss'
import Filter from '../../components/filter/Filter'
import { listData } from '../../lib/dummydata'
import Card from '../../components/card/Card'
import Map from "../../components/map/Map"

const ListPage = () => {
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {
            listData.map((item) => (
              <Card item={item} key={item.id}/>
            ))
          }
        </div>
      </div>
      <div className="mapContainer">
        <Map />
      </div>
    </div>
  )
}

export default ListPage
