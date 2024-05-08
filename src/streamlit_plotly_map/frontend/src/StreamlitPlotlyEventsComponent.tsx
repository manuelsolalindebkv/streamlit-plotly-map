import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { plot } from "plotly.js";
import MyMap from "./MyMap";



const StreamlitPlotlyEventsComponent = ({ args }: { args: any }) => {
  // Pull Plotly object from args and parse
  const plot_obj = JSON.parse(args["plot_obj"]);
  const override_height = args["override_height"];
  const override_width = args["override_width"];
  const max_selections = args["max_selections"];
  const selection_color = args["selection_color"];

  // Event booleans
  const click_event = args["click_event"];
  const select_event = args["select_event"];
  const hover_event = args["hover_event"];

  useEffect(() => {
    Streamlit.setFrameHeight(override_height);
  }, [override_height]);

  /** Click handler for plot. */
  const plotlyEventHandler = (data: any) => {
    
    let res = JSON.stringify(data)
    Streamlit.setComponentValue(res);
  };

  if (plot_obj.layout.mapbox) {
    return (
      <MyMap
        data={plot_obj.data}
        layout={plot_obj.layout}
        max_selections={max_selections}
        revision={1}
        selection_color={selection_color}
        onSelected={select_event ? plotlyEventHandler : undefined}
      />
    );
  } else {
    return (
      <Plot
        data={plot_obj.data}
        layout={plot_obj.layout}
        config={plot_obj.data}
        frames={plot_obj.frames}
        onClick={click_event ? plotlyEventHandler : undefined}
        onSelected={select_event ? plotlyEventHandler : undefined}
        onHover={hover_event ? plotlyEventHandler : undefined}
        style={{ width: override_width, height: override_height }}
        className="stPlotlyChart"
      />
    );

  }
  
  
};

export default withStreamlitConnection(StreamlitPlotlyEventsComponent);

