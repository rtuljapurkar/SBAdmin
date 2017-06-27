import React from 'react';
import TextInput from '../common/TextInput';
import StarInput from '../common/StarInput';
import {Button, Glyphicon} from 'react-bootstrap';
//import {glyphicon} from 'react-router';
import ReactStars from 'react-stars';
import {PropTypes} from 'prop-types';

const ManagePOIForm = ({poi, onChange, onSave, errors, saving, onCancel}) => {
  return (
    <form>       
      <table className="container ">
     <tbody>
         <tr>
             <td className="col-xs-4">
                 <TextInput
                   name="POIName"
                   label="Name"
                   value={poi.POIName== null? "":poi.POIName}
                   onChange={onChange}
                   error={errors.POIName}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="POIType"
                   label="Type"
                   value={poi.POIType== null? "":poi.POIType}
                   onChange={onChange}
                   error={errors.POIType}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="POISubType"
                   label="Sub Type"
                   value={poi.POISubType== null? "":poi.POISubType}
                   onChange={onChange}
                   error={errors.POISubType}/>
             </td>
         </tr>


         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="POIAddress"
                   label="Address"
                   value={poi.POIAddress== null? "":poi.POIAddress}
                   onChange={onChange}
                   error={errors.POIAddress}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="POICity"
                   label="City"
                   value={poi.POICity== null? "":poi.POICity}
                   onChange={onChange}
                   error={errors.POICity}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="POIState"
                   label="State"
                   value={poi.POIState== null? "":poi.POIState}
                   onChange={onChange}
                   error={errors.POIState}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="POIZip"
                   label="Zip Code"
                   value={poi.POIZip== null? "":poi.POIZip}
                   onChange={onChange}
                   error={errors.POIZip}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="POIGPSLoc"
                   label="GPS Location"
                   value={poi.POIGPSLoc== null? "":poi.POIGPSLoc}
                   onChange={onChange}
                   error={errors.POIGPSLoc}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="POIPhone"
                   label="Phone"
                   value={poi.POIPhone== null? "":poi.POIPhone}
                   onChange={onChange}
                   error={errors.POIPhone}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="POIDescription"
                   label="Description"
                   value={poi.POIDescription== null? "":poi.POIDescription}
                   onChange={onChange}
                   error={errors.POIDescription}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="POIDetails"
                   label="Details"
                   value={poi.POIDetails== null? "":poi.POIDetails}
                   onChange={onChange}
                   error={errors.POIDetails}/>
             </td>
             <td className="col-xs-2">
                 <TextInput
                   name="POITags"
                   label="Tags"
                   value={poi.POITags== null? "":poi.POITags}
                   onChange={onChange}
                   error={errors.POITags}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="POIImage"
                   label="Image"
                   value={poi.POIImage== null? "":poi.POIImage}
                   onChange={onChange}
                   error={errors.POIImage}/>
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

ManagePOIForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
  poi: PropTypes.object
};

export default ManagePOIForm;
