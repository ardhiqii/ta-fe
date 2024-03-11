import React from 'react'
import GroupContentLayout from './GroupContentLayout'
import SwipeableContent from './SwipeableContent'
import CardVeneu from '@components/CardVeneu'

const CARD_VENUE_DATA = [
  {
    id:'1',
    name:"Lapangan Futsal",
    location:"Merdeka, Cisitu Indah"
  },
  {
    id:'2',
    name:"GOR Bulutangkis Merdeka",
    location:"Merdeka, Cisitu Indah"
  },
  {
    id:'3',
    name:"Lapangan Tenis Siliwangi",
    location:"Cisitu Lama"
  },
  {
    id:'4',
    name:"Lapangan Basket Merbabu",
    location:"Cisitu Indah"
  },{
    id:'5',
    name:"Lapangan Sekolah",
    location:"Cisitu Baru"
  },
]

const RecommendRender = ({item}) =>{
  const data = {idVenue: item.id, name:item.name, location:item.location}
  return <CardVeneu {...data} />
}

const Recommend = () => {
  return (
    <GroupContentLayout title={"Recommend"}>
      <SwipeableContent data={CARD_VENUE_DATA} renderItem={RecommendRender} gap={20} />
    </GroupContentLayout>
  )
}

export default Recommend