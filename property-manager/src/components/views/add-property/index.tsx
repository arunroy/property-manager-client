import PropertyForm from '../../patterns/property-form';

export default function AddNewProperty(){
    const addNewPropertyHandler = (details: Object) => {
        console.log('Adding new property...');
        console.log(details);
    }
    return <div>
        <h4>Add new property</h4>
        <PropertyForm onSubmitHandler = { addNewPropertyHandler}/>
    </div>
}