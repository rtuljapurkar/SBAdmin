import React from 'react';
import TextInput from '../common/TextInput';
import StarInput from '../common/StarInput';
import {Button, Glyphicon} from 'react-bootstrap';
//import {glyphicon} from 'react-router';
import ReactStars from 'react-stars';
import {PropTypes} from 'prop-types';

const ManageVenueForm = ({venue, onChange, onSave, errors, saving, onCancel}) => {
  return (
    <form>
      <h1>Add/Edit Venue</h1>
      <table className="container ">
     <tbody>
         <tr>
             <td className="col-xs-4">
                 <TextInput
                   name="VName"
                   label="Name"
                   value={venue.VName}
                   onChange={onChange}
                   error={errors.VName}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="VAddress"
                   label="Address"
                   value={venue.VAddress}
                   onChange={onChange}
                   error={errors.VAddress}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="VCity"
                   label="City"
                   value={venue.VCity}
                   onChange={onChange}
                   error={errors.VCity}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="VState"
                   label="State"
                   value={venue.VState}
                   onChange={onChange}
                   error={errors.VState}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="VZip"
                   label="Zip Code"
                   value={venue.VZip}
                   onChange={onChange}
                   error={errors.VZip}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="VGPSLoc"
                   label="GPSLoc"
                   value={venue.VGPSLoc}
                   onChange={onChange}
                   error={errors.VGPSLoc}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="VDescription"
                   label="Description"
                   value={venue.VDescription}
                   onChange={onChange}
                   error={errors.VDescription}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="VCapacity"
                   label="Capacity"
                   value={venue.VCapacity+""}
                   onChange={onChange}
                   error={errors.VCapacity}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="VDetails"
                   label="Details"
                   value={venue.VDetails== null? "": venue.VDetails}
                   onChange={onChange}
                   error={errors.VDetails}/>
             </td>
         </tr>
         <tr>
             <td className="col-md-4">
                 <TextInput
                   name="VTags"
                   label="Tags"
                   value={venue.VTags}
                   onChange={onChange}
                   error={errors.VTags}/>
             </td>
         </tr>
         <tr>
             <td className="col-md-4">
                 <TextInput
                   name="VImage"
                   label="Image"
                   value={venue.VImage}
                   onChange={onChange}
                   error={errors.VImage}/>
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

ManageVenueForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
  venue: PropTypes.object
};

export default ManageVenueForm;
