import React from 'react';
import TextInput from '../common/TextInput';
import StarInput from '../common/StarInput';
import {Button, Glyphicon} from 'react-bootstrap';
//import {glyphicon} from 'react-router';
import ReactStars from 'react-stars';
import {PropTypes} from 'prop-types';

const VenueForm = ({venue, onSave, onChange, saving, errors, poi, onCancel, onStarRatingChange}) => {
  return (
    <form>
      <h1>Manage Venue</h1>
 <table style={{"width":"300px" }}>
     <tbody>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="VName"
                   label="VName"
                   value={venue.VName}
                   onChange={onChange}
                   error={errors.VName}/>
             </td>
         </tr>
         <tr>
             <td className="col-xs-2">
                 <TextInput
                   name="VAddress"
                   label="VAddress"
                   value={venue.VAddress}
                   onChange={onChange}
                   error={errors.VAddress}/>
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

VenueForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
  venue: PropTypes.object,
  onStarRatingChange: PropTypes.func.isRequired,
  amenity: PropTypes.object,
  poi: PropTypes.object
};

export default VenueForm;
