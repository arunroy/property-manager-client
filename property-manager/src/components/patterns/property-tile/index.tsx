import { FormEvent } from 'react';

import Button from '@mui/material/Button';
import PropTypes, { InferProps } from 'prop-types';
import { useHistory } from "react-router-dom";

function PropertyTile({ address, description, listedBy, referenceId }: InferProps<typeof PropertyTile.propTypes>) {
    const history = useHistory();
    
    const handleEdit = (event: FormEvent) => {
        const targetTile = (event.target as HTMLElement).parentNode;
        const selectedPropertyId = ((targetTile as HTMLElement).dataset.propertyrefid);
        console.log(selectedPropertyId);
        history.push('/update');
    }
    return (
        <div data-propertyrefid ={ referenceId.toString() }>
                <img src="https://via.placeholder.com/280x200" alt="Property images"/>
                <div>
                    <span>{ address }</span>
                </div>
                <div>
                    <span>{ description }</span>
                </div>
                <div>
                    <span> { listedBy }</span>
                </div>
                <Button onClick={ handleEdit }>Edit this property</Button>
        </div>
    )
}

PropertyTile.propTypes = {
    address: PropTypes.string.isRequired,
    description: PropTypes.string,
    listedBy: PropTypes.string.isRequired,
    referenceId: PropTypes.string.isRequired
}

export default PropertyTile;
