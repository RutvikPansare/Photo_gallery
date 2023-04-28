import React from "react";


import { render, screen, cleanup} from '@testing-library/react'
import ImageGrid from "./ImagesGrid"
test('should render Images component', () => {
  render(<ImageGrid/>);
  const ImagesGrid = screen.getByTestId("imageGrid");
  expect(ImagesGrid).toBeInTheDocument();
  expect(ImagesGrid).toContainHTML('<img>')
})

test('matches snapshot', () =>{
    const curatedPhotos = [{
        id: 16350045,
        width: 4016,
        height: 6016,
        url: 'https://www.pexels.com/photo/wood-light-dawn-landscape-16350045/',
        photographer: 'Annija Ungura',
        photographer_url: 'https://www.pexels.com/@annija-ungura-492300719',
        photographer_id: 492300719,
        avg_color: '#373828',
        src: [Object],
        liked: false,
        alt: ''
      },
      {
        id: 16349985,
        width: 3832,
        height: 5740,
        url: 'https://www.pexels.com/photo/food-man-people-woman-16349985/',
        photographer: 'Annija Ungura',
        photographer_url: 'https://www.pexels.com/@annija-ungura-492300719',
        photographer_id: 492300719,
        avg_color: '#5B5437',
        src: [Object],
        liked: false,
        alt: ''
      }]
    const component = renderer.create(
      <ImageGrid curatedPhotos={curatedPhotos}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })