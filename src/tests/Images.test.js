import React from "react";


import { render, screen, cleanup} from '@testing-library/react'
import Images from "../Images"
test('should render Images component', () => {
  render(<Images/>);
  const ImagesElement = screen.getByTestId("images");
  expect(ImagesElement).toBeInTheDocument();
  expect(ImagesElement).toHaveTextContent('Photo Gallery')
})

test('matches snapshot', () =>{
  const component = renderer.create(
    <Images/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

