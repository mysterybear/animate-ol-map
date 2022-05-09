import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import React, { Fragment, useEffect, useRef, useState } from "react"
import OSM from "ol/source/OSM"
import "./App.css"
import { fromLonLat } from "ol/proj"

const istanbul = fromLonLat([28.9744, 41.0128])
const london = fromLonLat([-0.12755, 51.507222])

function App() {
  const mapElementRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>(null!)

  const [isIstanbul, setIsIstanbul] = useState(true)

  useEffect(() => {
    if (!mapElementRef.current) return
    const view = new View({
      center: istanbul,
      zoom: 6,
    })

    mapRef.current = new Map({
      target: mapElementRef.current,
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM(),
        }),
      ],
      view: view,
    })
  }, [])

  const action = () => {
    if (!mapRef.current) return

    mapRef.current.getView().animate({
      center: isIstanbul ? london : istanbul,
    })

    setIsIstanbul(!isIstanbul)
  }

  const rotateLeft = () => {
    if (!mapRef.current) return
    const view = mapRef.current.getView()
    view.animate({
      rotation: view.getRotation() + Math.PI / 2,
    })
  }

  const rotateRight = () => {
    if (!mapRef.current) return
    const view = mapRef.current.getView()
    view.animate({
      rotation: view.getRotation() - Math.PI / 2,
    })
  }

  return (
    <Fragment>
      <div
        ref={mapElementRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <button onClick={action}>Action</button>
        <button onClick={rotateLeft}>rotateLeft</button>
        <button onClick={rotateRight}>rotateRight</button>
      </div>
    </Fragment>
  )
}

export default App
