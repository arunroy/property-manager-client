import { render, screen } from '@testing-library/react';
import PropertyCard from './index';

test('does not render anythig when address is specified', () => {
    render(<PropertyCard address='41 Manchester Road' description='newly refurbished apartment' listedBy='SterlingDeVere'></PropertyCard>);
    
    const address = screen.getByText('41 Manchester Road');
    const description = screen.getByText('newly refurbished apartment');
    const listedBy = screen.getByText('SterlingDeVere');

    expect(address).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(listedBy).toBeInTheDocument();

});

