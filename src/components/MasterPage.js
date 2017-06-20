import React from 'react';
import { Link } from 'react-router';
import Header from './common/Header';
import {PropTypes} from 'prop-types';

class MasterPage extends React.Component {
  render() {
       let title = "";
      try {
          title = this.props.children.props.routes[2].title;
      }
      catch (ex){
         title = "";
      }
    return (
      // <div className='MasterPage'>
      //   <Header />
      //   { this.props.children }
      // </div>
 <div >
        <div className="col-md-12">
          <Header/>
          {/* {//console.log(this.props)} */}
          <title>{title}</title>
        </div>
        <div id="body" className="col-md-12" >
            <div  className="col-md-2  visible-md visible-lg " >
            </div>
            <div className="col-md-9" >
                {this.props.children}
            </div>

            <div id="sidebar" className="col-md-1 visible-md visible-lg" style={{"paddingRight": "2px"}}>
             </div>
        </div>
   </div>
    );
  }
}

MasterPage.propTypes = {
    children: PropTypes.object.isRequired
};

export default MasterPage;
