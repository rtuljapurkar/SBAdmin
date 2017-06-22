import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {Button, Glyphicon} from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {Link} from 'react-router';

// Stateless cell components for Table component
function renderSortArrow (sortKey, sortDesc, sortId) {
  return sortKey === sortId ? (sortDesc ? '↓' : '↑') : '';
}

//  function redirectToDelete(){
//     debugger;
// }
//  --------------------------------------------------------------------------------------------------------------//
//const VenuesTable = ({venue, venues, redirectToDelete }) => {
class VenuesTable extends React.Component{
    constructor(props){
        super(props);
        this.redirectToDelete = this.redirectToDelete.bind(this);
    }

    redirectToDelete(){
        this.props.OnDeleteVenue(this.props.venue);
    }

    render(){
        const {venue, venues, OnDeleteVenue } = this.props;
    return (
        <div className="blackBg">
            <div className="ib" >
                <div className="ib" style={{"maxWidth":"100%"}}>
                      {venue["VName"]} <br/><br/>
                      {venue["VAddress"]}<br/>
                      {venue["VCity"]}
                </div>
                <div className="ib" style={{"maxWidth":"100%"}}>
                    {venue["VDescription"]}
                </div>
                <div className="ib" style={{"maxWidth":"100%"}}>
                    <div className="ibInline">
                            <Link to={"/amenities/"+venue.id}>
                                <Button bsStyle="primary" bsSize="small"  >
                                    <Glyphicon glyph="pencil" />  Amenities
                                </Button>
                            </Link>
                     </div>
                     <div className="ibInline">
                             <Link to={"/poi/"+venue.id}>
                                    <Button bsStyle="primary" bsSize="small"  >
                                        <Glyphicon glyph="pencil" />  Local 411
                                    </Button>
                                </Link>
                     </div>
                     <div className="ibInline">
                         <Link to={"/venues/edit/"+venue.id}>
                                   <Button bsStyle="primary" bsSize="small" >
                                       <Glyphicon glyph="pencil" />  Edit Venue
                                   </Button>
                          </Link>
                     </div>
                     <div className="ibInline">
                         {
                             <Button bsStyle="primary" onClick={this.redirectToDelete} bsSize="small" >
                                       <Glyphicon glyph="pencil" /> Delete Venue
                             </Button>
                           }
                     </div>
                </div>
            </div>
            <div className="ibright">
                 <Link to={"/venues/"+venue.id}>
                    <img src={venue["VImage"]} height="200" width="200" alt=""   />
                 </Link>
            </div>
            <div className="break">&nbsp;</div>
        </div>
    );
    }
}

VenuesTable.propTypes = {
  // actions
  //fetchData: PropTypes.func.isRequired,
  sortBy: PropTypes.func,
  filterBy: PropTypes.func,

  // state data
  data: PropTypes.array,
  filterString: PropTypes.string,
  sortKey: PropTypes.string,
  sortDesc: PropTypes.bool,
  venues: PropTypes.array,
  actions:PropTypes.object,
  venue:PropTypes.object
};

export default VenuesTable;
