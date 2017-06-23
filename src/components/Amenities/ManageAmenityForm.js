import React from 'react';
import TextInput from '../common/TextInput';
import StarInput from '../common/StarInput';
import {Button, Glyphicon} from 'react-bootstrap';
//import {glyphicon} from 'react-router';
import ReactStars from 'react-stars';
import {PropTypes} from 'prop-types';

const ManageAmenityForm = ({amenity, onChange, onSave, errors, saving, onCancel}) => {
  return (
    <form>
      <h1>Add/Edit Amenity</h1>
      <table className="container ">
     <tbody>
         <tr>
             <td className="col-xs-4">
                 <TextInput
                   name="AName"
                   label="Name"
                   value={amenity.AName}
                   onChange={onChange}
                   error={errors.AName}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ASection"
                   label="Section"
                   value={amenity.ASection}
                   onChange={onChange}
                   error={errors.ASection}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AChildAmenity"
                   label="Child Amenity"
                   value={amenity.AChildAmenity}
                   onChange={onChange}
                   error={errors.AChildAmenity}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="AType"
                   label="Type"
                   value={amenity.AType}
                   onChange={onChange}
                   error={errors.AType}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="ASubType"
                   label="SubType"
                   value={amenity.ASubType}
                   onChange={onChange}
                   error={errors.ASubType}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="AMainFood"
                   label="Main Food"
                   value={amenity.AMainFood}
                   onChange={onChange}
                   error={errors.AMainFood}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AVeggieFood"
                   label="Veggie Food"
                   value={amenity.AVeggieFood}
                   onChange={onChange}
                   error={errors.AVeggieFood}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="AVeganFood"
                   label="Vegan Food"
                   value={amenity.AVeganFood+""}
                   onChange={onChange}
                   error={errors.AVeganFood}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AGFFood"
                   label="GF Food"
                   value={amenity.AGFFood}
                   onChange={onChange}
                   error={errors.AGFFood}/>
             </td>
         </tr>
         <tr>
             <td className="col-md-4">
                 <TextInput
                   name="ABeverages"
                   label="Beverages"
                   value={amenity.ABeverages}
                   onChange={onChange}
                   error={errors.ABeverages}/>
             </td>
         </tr>
         <tr>
             <td className="col-md-4">
                 <TextInput
                   name="ADomesticBeer"
                   label="Domestic Beer"
                   value={amenity.ADomesticBeer}
                   onChange={onChange}
                   error={errors.ADomesticBeer}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ACraftBeer"
                   label="Craft Beer"
                   value={amenity.ACraftBeer+""}
                   onChange={onChange}
                   error={errors.ACraftBeer}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AMixedDrinks"
                   label="Mixed Drinks"
                   value={amenity.AMixedDrinks}
                   onChange={onChange}
                   error={errors.AMixedDrinks}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ATags"
                   label="Tags"
                   value={amenity.ATags}
                   onChange={onChange}
                   error={errors.ATags}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="ACost"
                   label="Cost"
                   value={amenity.ACost}
                   onChange={onChange}
                   error={errors.ACost}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ADistance"
                   label="Distance"
                   value={amenity.ADistance+""}
                   onChange={onChange}
                   error={errors.ADistance}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AWalkingTime"
                   label="Walking Time"
                   value={amenity.AWalkingTime}
                   onChange={onChange}
                   error={errors.AWalkingTime}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ALotLocation"
                   label="Lot Location"
                   value={amenity.ALotLocation+""}
                   onChange={onChange}
                   error={errors.ALotLocation}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AKidsOk"
                   label="Kids Ok"
                   value={amenity.AKidsOk}
                   onChange={onChange}
                   error={errors.AKidsOk}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="AImage"
                   label="Image URL"
                   value={amenity.AImage+""}
                   onChange={onChange}
                   error={errors.AImage}/>
             </td>
         </tr>

         <tr>
             <td className="col-md-2">
                 <input
                   type="submit"
                   disabled={saving}
                   value={saving ? 'Saving...' : 'Save'}
                   className="btn btn-primary"
                   onClick={onSave}/>

                   &nbsp;&nbsp;
                   <input style={{"width":"80px"}}
                     disabled={saving}
                     value={'Cancel'}
                     className="btn btn-danger"
                     onClick={onCancel}/>
             </td>
         </tr>
     </tbody>
 </table>

    </form>
  );
};

ManageAmenityForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
  amenity: PropTypes.object
};

export default ManageAmenityForm;
