import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {Button, Glyphicon, SplitButton, MenuItem} from 'react-bootstrap';

//import '../../styles/fixed-data-table.css';
//import {Button, Glyphicon} from 'react-bootstrap';

 //  --------------------------------------------------------------------------------------------------------------//
//const PointOfInterestTable = ({ PointOfInterest, venue }) => {
  class PointOfInterestTable extends React.Component{
      constructor(props){
          super(props);
          this.redirectToDisable = this.redirectToDisable.bind(this);
          this.redirectToEnable = this.redirectToEnable.bind(this);
          this.redirectToManage = this.redirectToManage.bind(this);
      }
  redirectToDisable(){
      this.props.onDisable(this.props.PointOfInterest);
  }

  redirectToEnable(){
      this.props.onEnable(this.props.PointOfInterest);
  }

  redirectToManage(){
      this.props.onManage(this.props.PointOfInterest);
  }

    render(){
    const {PointOfInterest, venue} = this.props;
    let id = PointOfInterest["id"];
    let active = PointOfInterest["Active"];
    let rows = [];
    let rowHeader = [];
    let rowImage = [];
    let buttonRow = [];
    for (let key in PointOfInterest)
    {
      if (PointOfInterest.hasOwnProperty(key) && key!= "id" && key!= "VenueID" && key!= "Active"
      && key!= "POIGPSLoc") {
                let value = PointOfInterest[key] == null ? "": PointOfInterest[key];
                let modifiedkey = key.substr(3);
                if(modifiedkey == "Name"){
                    rowHeader.push(<p key={id} style={{"fontSize":"24px"}}><b>{value}</b></p>);
                    {active == 1 &&   rowHeader.push(
                                   <Button key={id+"disable"} bsStyle="danger" onClick={this.redirectToDisable}  bsSize="small" >
                                       <Glyphicon glyph="pencil" />  Disable
                                   </Button>
                               );}
                     {active == 0 &&   rowHeader.push(
                                    <Button key={id+"enable"} bsStyle="success" onClick={this.redirectToEnable}  bsSize="small" >
                                        <Glyphicon glyph="pencil" />  Enable
                                    </Button>
                                );          }

                    buttonRow.push(<a key={id} href={"/posts/poi/add/"+id}>
                                    <Button bsStyle="primary" bsSize="small" >
                                        <Glyphicon glyph="pencil" />  Review
                                    </Button>
                                </a>);
                    buttonRow.push(<b key={id+"space"}>&nbsp;&nbsp;&nbsp;&nbsp;</b>);
                    buttonRow.push(<Button key={id+"Button"} bsStyle="primary" onClick={this.redirectToManage}  bsSize="small" >
                                        <Glyphicon glyph="pencil" />  Edit
                                    </Button>
                              );
                }

                else if(modifiedkey == "Image"){
                        rowImage.push(<img src={value} key={id} height="200" width="200" alt=""/>);
                }
                else
                 {
                    rows.push(<span key={modifiedkey+id}>{modifiedkey}: {value}<br/> </span>);
                }
          }
     }

    return (
                // <tr >
                //    <td  className="blackBg" >
                //       {rows}
                //   </td>
                //   <td>
                //      <img src={PointOfInterest["POIImage"]} height="200" width="200" alt=""   />
                //   </td>
                // </tr>
                <div className="blackBg">
                       <div className="ib">{rowHeader}</div>
                       <div className="ibright">{buttonRow}</div>
                       <div className="ib">{rows}</div>
                       <div className="ibright">{rowImage}</div>
                       <div className="break">&nbsp;</div>
                </div>
    );
  }
}

PointOfInterestTable.propTypes = {
  sortBy: PropTypes.func,
  filterBy: PropTypes.func,
  // state data
  data: PropTypes.array,
  filterString: PropTypes.string,
  sortKey: PropTypes.string,
  sortDesc: PropTypes.bool,
  pointOfInterests: PropTypes.object,
  actions:PropTypes.object,
  PointOfInterest: PropTypes.object,
  venue: PropTypes.object,
  onDisableVenue: PropTypes.func,
  onEnableVenue: PropTypes.func,
  onDisable: PropTypes.func,
  onEnable: PropTypes.func,
  onManage: PropTypes.func
};


export default PointOfInterestTable;
