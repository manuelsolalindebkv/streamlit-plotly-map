
import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import { on } from 'events';
const Plot = createPlotlyComponent(Plotly);

const ScatterMapbox = (props) => {

  const {data, layout, onSelected, selection_color='red'} = props;


  let [datatemplate, setDatatemplate] = useState(null);
  let [selectedPoints, setSelectedPoints] = useState([]);
  let [unselectedPoints, setUnselectedPoints] = useState([]);
  let [mylayout, setLayout] = useState(layout);


  const onInitialized = (figure) => {
    console.log('onInitialized')
    console.log(figure);
  }

  const onSelectPoints = (event) => {

    let selectedPoints = event.points.map((point) => {
      return {
        index: point.pointIndex,
        lat: point.lat,
        lon: point.lon
      }
    });

    let unselectedPoints = event.points[0].data.lat.map((lat, i) => {
      return {
        index: i,
        lat: lat,
        lon: event.points[0].data.lon[i],
      }
    }
    );

    setSelectedPoints(selectedPoints);
    setUnselectedPoints(unselectedPoints);
    onSelected(selectedPoints);
  }


  useEffect(() => {
    setDatatemplate(data[0]);
    
    let datapoints = data[0].lat.map((lat, i) => {
      return {
        index: i,
        lat: lat,
        lon: data[0].lon[i],
      }
    });
    
    setUnselectedPoints(datapoints);

    setLayout(layout);
  }, []);


  console.log(selectedPoints)
  console.log(unselectedPoints)


  let mydata = [
    {
      ...datatemplate,
      lat: unselectedPoints.map((point) => point.lat),
      lon: unselectedPoints.map((point) => point.lon),
      // marker: {
        //   color: 'blue',
        //   size: 10,
        // }
      // clear selection
    },
    {
      ...datatemplate,
      lat: selectedPoints.map((point) => point.lat),
      lon: selectedPoints.map((point) => point.lon),
      marker: {
        color: selection_color
        // size: 10,
      },
    }

  ]


  return (
    <Plot
      data={mydata}
      layout={mylayout}
      onSelected={onSelectPoints}
      // onClick={(event) => console.log(event)} //not working
      onInitialized={onInitialized}
      // onRelayout={onRelayout}
      // onUpdate={(figure) => console.log(figure)}

    />
  );
}

export default ScatterMapbox;


