import PropTypes, { InferProps } from 'prop-types'

function PropertyTile({ address, description, listedBy}: InferProps<typeof PropertyTile.propTypes>) {
    return (
        <div>
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
        </div>
    )
}

PropertyTile.propTypes = {
    address: PropTypes.string.isRequired,
    description: PropTypes.string,
    listedBy: PropTypes.string.isRequired
}

export default PropertyTile;
