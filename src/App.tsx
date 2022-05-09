import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import { fromLonLat } from "ol/proj"
import OSM from "ol/source/OSM"
import React, { Fragment, useEffect, useRef, useState } from "react"
import "./App.css"

const istanbul = fromLonLat([28.9744, 41.0128])
const london = fromLonLat([-0.12755, 51.507222])

function App() {
  const mapElementRef = useRef<HTMLDivElement>(null)

  const [isIstanbul, setIsIstanbul] = useState(true)

  const [map] = useState(
    new Map({
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM(),
        }),
      ],
      view: new View({
        center: istanbul,
        zoom: 6,
      }),
    })
  )

  useEffect(() => {
    if (!mapElementRef.current) return
    map.setTarget(mapElementRef.current)
    return () => {
      map.setTarget(undefined)
    }
  }, [map])

  const action = () => {
    map.getView().animate({
      center: isIstanbul ? london : istanbul,
    })

    setIsIstanbul(!isIstanbul)
  }

  const rotateLeft = () => {
    const view = map.getView()
    view.animate({
      rotation: view.getRotation() + Math.PI / 2,
    })
  }

  const rotateRight = () => {
    const view = map.getView()
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
