
import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);


const pointIsEqual = (point1, point2) => {
  let coord_equal = point1.lat === point2.lat && point1.lon === point2.lon;
  // let custom_data_str_1 = JSON.stringify(point1.customdata);
  // let custom_data_str_2 = JSON.stringify(point2.customdata);
  // let custom_data_equal = custom_data_str_1 === custom_data_str_2;
  // return coord_equal && custom_data_equal;
  return coord_equal
}

const ScatterMapbox = (props) => {

  const {data, layout, onSelected, selection_color='red', max_selections} = props;

  let [datatemplate, setDatatemplate] = useState(null);
  let [selectedPoints, setSelectedPoints] = useState([]);
  let [unselectedPoints, setUnselectedPoints] = useState([]);
  let [mylayout, setLayout] = useState(layout);


  const onInitialized = (figure) => {
    console.log('onInitialized')
    console.log(figure);
  }

  const onSelectPoints = (event) => {
    
    try {
    // allPoints (join selected and unselected points)
    const allPoints = selectedPoints.concat(unselectedPoints);

    console.log(event.points)


      
      let newSelectedPoints = event.points.map((point) => {
        return {
          lat: point.lat,
          lon: point.lon,
          customdata: point.customdata
        }
      });

      // if max_selections is defined, only keep the last max_selections points
      if (max_selections) {
        if (newSelectedPoints.length > max_selections) {
          newSelectedPoints = newSelectedPoints.slice(-max_selections);
          alert('You can only select ' + max_selections + ' points');
        }
      }
      
      let newUnselectedPoints = allPoints.filter((point) => {
        return !newSelectedPoints.find((selectedPoint) => pointIsEqual(selectedPoint, point));
      });
      
      setSelectedPoints(newSelectedPoints);
      setUnselectedPoints(newUnselectedPoints);
      onSelected(newSelectedPoints);
    } catch (error) {
      console.log(error)
      return;
    
    }


  }


  useEffect(() => {
    setDatatemplate(data[0]);
    
    let datapoints = data[0].lat.map((lat, i) => {
      return {
        lat: lat,
        lon: data[0].lon[i],
        customdata: data[0].customdata[i]
      }
    });
    
    setUnselectedPoints(datapoints);

    setLayout(layout);
  }, []);


  let mydata = [
    {
      ...datatemplate,
      lat: unselectedPoints.map((point) => point.lat),
      lon: unselectedPoints.map((point) => point.lon),
      customdata: unselectedPoints.map((point) => point.customdata),
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
      customdata: selectedPoints.map((point) => point.customdata),
      marker: {
        color: selection_color
        // size: 10,
      },
    }

  ]


  return (
    <Plot
      className="plot-container"
      // full width
      style={{ width: '100%', height: '100%' }}
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


