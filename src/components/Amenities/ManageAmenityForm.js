import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import StarInput from '../common/StarInput';
import {Button, Glyphicon} from 'react-bootstrap';
//import {glyphicon} from 'react-router';
import ReactStars from 'react-stars';
import {PropTypes} from 'prop-types';

Array.prototype.contains = function(v) {
    for(let i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    let arr = [];
    for(let i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
};


const ManageAmenityForm = ({amenity, onChange, onSave, errors, saving, onCancel}) => {
    let arrAmenityType = [
        {
            value: "Miscellaneous",
            text: "Miscellaneous"
        },
        {
            value: "Food and Beverage",
            text: "Food and Beverage"
        },
        {
            value: "Information",
            text: "Information"
        },
        {
            value:  "Merchandise",
            text:  "Merchandise"
        },
        {
            value: "Parking",
            text: "Parking"
        },
        {
            value: "Restrooms",
            text: "Restrooms"
        }];

   let arrAmenitySubTypes = [
                                { value:"Alcohol", text: "Alcohol", type: "Food and Beverage"},
                                { value:"Bar", text: "Bar", type: "Food and Beverage"},
                                { value:"Club", text: "Club", type: "Food and Beverage"},
                                { value:"Dessert", text: "Dessert", type: "Food and Beverage"},
                                { value:"Restaurant", text: "Restaurant", type: "Food and Beverage"},
                                { value:"Specialty Concession", text: "Specialty Concession", type: "Food and Beverage"},
                                { value:"Traditional Concession", text: "Traditional Concession", type: "Food and Beverage"},
                                { value:"Access Points", text: "Access Points", type: "Information"},
                                { value:"ATM", text: "ATM", type: "Information"},
                                { value:"First Aid", text: "First Aid", type: "Information"},
                                { value:"Guest Services", text: "Guest Services", type: "Information"},
                                { value:"Promotion", text: "Promotion", type: "Information"},
                                { value:"Ticket Sales", text: "Ticket Sales", type: "Information"},
                                { value:"Transportation", text: "Transportation", type: "Information"},
                                { value:"Authentic", text: "Authentic", type: "Merchandise"},
                                { value:"Hats", text: "Hats", type: "Merchandise"},
                                { value:"Official", text: "Official", type: "Merchandise"},
                                { value:"Attraction", text: "Attraction", type: "Miscellaneous"},
                                { value:"Social Seating", text: "Social Seating", type: "Miscellaneous"},
                                { value:"Handicap Only", text: "Handicap Only", type: "Parking"},
                                { value:"Official", text: "Official", type: "Parking"}
                            ];
    //let uniqueArrOptions = arrOptions.unique();

  return (
    <form>

      <table className="container ">
     <tbody>
         <tr>
             <td className="col-xs-4">
                 <TextInput
                   name="AName"
                   label="Name"
                   value={amenity.AName== null? "":amenity.AName}
                   onChange={onChange}
                   error={errors.AName}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ASection"
                   label="Section"
                   value={amenity.ASection== null? "":amenity.ASection}
                   onChange={onChange}
                   error={errors.ASection}/>
             </td>
             <td className="col-xs-2 col-md-4">
                 <TextInput
                   name="AChildAmenity"
                   label="Child Amenity"
                   value={amenity.AChildAmenity== null? "":amenity.AChildAmenity}
                   onChange={onChange}
                   error={errors.AChildAmenity}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                       <SelectInput
                         name="AType"
                         label="Type"
                         value={amenity.AType}
                         defaultOption="Select Type"
                         onChange={onChange}
                         options={arrAmenityType}
                         error={errors.AType}/>
             </td>

             <td className="col-xs-2">
                       <SelectInput
                         name="ASubType"
                         label="Sub Type"
                         value={amenity.ASubType}
                         defaultOption="Select Sub Type"
                         onChange={onChange}
                         options={arrAmenitySubTypes.filter(function(e){
                             return e.type == amenity.AType;
                         })}
                         error={errors.ASubType}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="AMainFood"
                   label="Main Food"
                   value={amenity.AMainFood== null? "":amenity.AMainFood}
                   onChange={onChange}
                   error={errors.AMainFood}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AVeggieFood"
                   label="Veggie Food"
                   value={amenity.AVeggieFood == null? "": amenity.AVeggieFood}
                   onChange={onChange}
                   error={errors.AVeggieFood}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="AVeganFood"
                   label="Vegan Food"
                   value={amenity.AVeganFood == null? "": amenity.AVeganFood}
                   onChange={onChange}
                   error={errors.AVeganFood}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AGFFood"
                   label="GF Food"
                   value={amenity.AGFFood== null? "":amenity.AGFFood}
                   onChange={onChange}
                   error={errors.AGFFood}/>
             </td>
         </tr>
         <tr>
             <td className="col-md-4">
                 <TextInput
                   name="ABeverages"
                   label="Beverages"
                   value={amenity.ABeverages== null? "":amenity.ABeverages}
                   onChange={onChange}
                   error={errors.ABeverages}/>
             </td>
         </tr>
         <tr>
             <td className="col-md-4">
                 <TextInput
                   name="ADomesticBeer"
                   label="Domestic Beer"
                   value={amenity.ADomesticBeer== null? "":amenity.ADomesticBeer}
                   onChange={onChange}
                   error={errors.ADomesticBeer}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ACraftBeer"
                   label="Craft Beer"
                   value={amenity.ACraftBeer== null? "":amenity.ACraftBeer}
                   onChange={onChange}
                   error={errors.ACraftBeer}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AMixedDrinks"
                   label="Mixed Drinks"
                   value={amenity.AMixedDrinks== null? "":amenity.AMixedDrinks}
                   onChange={onChange}
                   error={errors.AMixedDrinks}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ATags"
                   label="Tags"
                   value={amenity.ATags== null? "":amenity.ATags}
                   onChange={onChange}
                   error={errors.ATags}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="ACost"
                   label="Cost"
                   value={amenity.ACost== null? "":amenity.ACost}
                   onChange={onChange}
                   error={errors.ACost}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ADistance"
                   label="Distance"
                   value={amenity.ADistance == null? "":amenity.ADistance}
                   onChange={onChange}
                   error={errors.ADistance}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AWalkingTime"
                   label="Walking Time"
                   value={amenity.AWalkingTime== null? "":amenity.AWalkingTime}
                   onChange={onChange}
                   error={errors.AWalkingTime}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="ALotLocation"
                   label="Lot Location"
                   value={amenity.ALotLocation == null? "": amenity.ALotLocation}
                   onChange={onChange}
                   error={errors.ALotLocation}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="AKidsOk"
                   label="Kids Ok"
                   value={amenity.AKidsOk== null? "":amenity.AKidsOk}
                   onChange={onChange}
                   error={errors.AKidsOk}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="AImage"
                   label="Image URL"
                   value={amenity.AImage== null? "":amenity.AImage}
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

{/* <TextInput
  name="AType"
  label="Type"
  value={amenity.AType== null? "":amenity.AType}
  onChange={onChange}
  error={errors.AType}/> */}
