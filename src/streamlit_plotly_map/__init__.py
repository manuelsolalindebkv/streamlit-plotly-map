import os
import streamlit.components.v1 as components
import plotly.express as px
import pandas as pd
from json import loads

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = True

# Declare a Streamlit component. `declare_component` returns a function
# that is used to create instances of the component. We're naming this
# function "_component_func", with an underscore prefix, because we don't want
# to expose it directly to users. Instead, we will create a custom wrapper
# function, below, that will serve as our component's public API.

# It's worth noting that this call to `declare_component` is the
# *only thing* you need to do to create the binding between Streamlit and
# your component frontend. Everything else we do in this file is simply a
# best practice.

if not _RELEASE:
    _component_func = components.declare_component(
        # We give the component a simple, descriptive name ("my_component"
        # does not fit this bill, so please choose something better for your
        # own component :)
        "plotly_map",
        # Pass `url` here to tell Streamlit that the component will be served
        # by the local dev server that you run via `npm run start`.
        # (This is useful while your component is in development.)
        url="http://localhost:3001",
    )
else:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("plotly_map", path=build_dir)


def plotly_map(df: pd.DataFrame, 
               selection_color='red', 
               key=None, 
               **kwargs):
    """Create a new instance of "plotly_map".
    **kwargs are passed to plotly.express.scatter_mapbox
    """

    assert "lat" in df.columns, "Latitude column (lat) not found in DataFrame"
    assert "lon" in df.columns, "Longitude column (lon) not found in DataFrame"

    if key is None:
        key = "mymap"

    fig1 = px.scatter_mapbox(df, lat="lat", lon="lon", mapbox_style="open-street-map", **kwargs)

    component_value = _component_func(
        plot_obj=fig1.to_json(),
        override_height=450,
        override_width="100%",
        key=key,
        click_event=True,
        select_event=True,
        hover_event=False,
        selection_color=selection_color,
        default="[]",  # Default return empty JSON list
    )

    # Parse component_value since it's JSON and return to Streamlit
    selected_points =  loads(component_value)

    return selected_points



