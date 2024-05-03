import setuptools

setuptools.setup(
    name="streamlit-plotly-map",
    version="0.0.1",
    author="Manuel Solalinde",
    author_email="manolosolalinde@gmail.com",
    description="Plotly Map component for Streamlit that allows point selection",
    long_description="Plotly Map component for Streamlit that allows point selection",
    long_description_content_type="text/plain",
    url="https://github.com/manuelsolalindebkv/streamlit-plotly-map",
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),
    include_package_data=True,
    package_data={
        "streamlit_plotly_map": ["frontend/build/**", "frontend/build/static/js/**"]
    },
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        "streamlit >= 0.63",
        "plotly >= 4.14.3",
    ],
)
