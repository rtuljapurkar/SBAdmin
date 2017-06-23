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


class VenuesTable extends React.Component{
    constructor(props){
        super(props);
        this.redirectToDisable = this.redirectToDisable.bind(this);
        this.redirectToEnable = this.redirectToEnable.bind(this);
    }

    redirectToDisable(){
        this.props.onDisableVenue(this.props.venue);
    }

    redirectToEnable(){
        this.props.onEnableVenue(this.props.venue);
    }

    render(){
        const {venue, venues, onDisableVenue, onEnableVenue   } = this.props;
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
                     {venue.Active == 1 &&
                         <div className="ibInline">
                             {
                                 <Button bsStyle="danger" onClick={this.redirectToDisable} bsSize="small" >
                                           <Glyphicon glyph="pencil" /> Disable Venue
                                 </Button>
                               }
                         </div>}
                     {venue.Active ==0 &&
                            <div className="ibInline">
                             {
                                 <Button bsStyle="success" onClick={this.redirectToEnable} bsSize="small" >
                                           <Glyphicon glyph="pencil" /> Enable Venue
                                 </Button>
                               }
                            </div>}
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
  venue:PropTypes.object,
  onDisableVenue: PropTypes.func,
  onEnableVenue: PropTypes.func
};

export default VenuesTable;
