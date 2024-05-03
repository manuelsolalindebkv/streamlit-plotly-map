import streamlit as st
import pandas as pd
import numpy as np

from streamlit_plotly_map import plotly_map

st.title("Map Events")

df = pd.DataFrame(
    np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4],
    columns=['lat', 'lon'])


selected_points = plotly_map(df, key="mymap", selection_color='blue')

st.write(f"Selected: {selected_points}")

