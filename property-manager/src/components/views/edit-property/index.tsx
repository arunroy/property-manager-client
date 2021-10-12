import { useState } from 'react';
import axios from 'axios';
import PropertyForm from '../../patterns/property-form';

const API_URL = 'http://localhost:9000/graphql';

interface PropertyInfoType {
        address: string,
        description: string, 
        listedBy: string,
        referenceId: string,
        price: string,
        datePosted: string
}

export default function EditProperty(){
        const [hasEncounteredError, setUploadError] = useState(false);

        const updatePropertyDetails = async (details: PropertyInfoType) => {
                try {
                    const headers = {
                        'Content-Type': 'application/json',
                      }
        
                    const response = await axios.post(API_URL,{
                        headers,
                        body: { query: `
                        mutation {
                                createProperty(propertyInput:{
                                        address: ${details.address},
                                        description: ${details.description},
                                  price: ${details.price},
                                  datePosted: ${details.datePosted}
                                })
                                {
                                  address
                                  description  
                                }
                              }`
                        }});
        
                        console.log('Property Info from remote DB');
                        console.log(details);
                        return details;
                }
                catch(e) {
                    setUploadError(true);
                }
           
            }
        
        const submitUpdateHandler = (details: Object) => {
                console.log('Updating existing property...');
                console.log(details);
                updatePropertyDetails(details);
        }
        return <div>
                <h4>Update property</h4>
                <PropertyForm onSubmitHandler={submitUpdateHandler}/>
        </div>
}