import {fetchWithDelay2} from  './delay';
import axios from 'axios';

function handleErrors(response) {
     if (!response.status == "200") {
         console.log("response.statusText");
         throw Error("Error getting data");

     }
     return response;
 }

class VenuesApi {
    static getAllVenues() {
        const host = `${process.env.API_HOST}`;
        // const request = new Request(`${process.env.API_HOST}/sb_venue`, {
        //   method: 'GET'
        // });
        let filter = "";
        //filter = "filter[where][Active]=1";
        const request = `${process.env.API_HOST}/sb_venue?`;// + filter;

        return fetchWithDelay2(request)
        .then(handleErrors)
        .then(response => {
                return response.data;
            })
        .catch(error => {
                throw error;
            });
        }

    static getAllTeams() {
          const host = `${process.env.API_HOST}`;
        //   const request = new Request(`${process.env.API_HOST}/sb_teams`, {
        //     method: 'GET'
        //   });
          const request = `${process.env.API_HOST}/sb_teams`;
          return fetchWithDelay2(request)
          .then(handleErrors)
          .then(response => {
                  return response.data;
              }).catch(error => {
                  throw error;
              });
          }

    static getAllAmenities(venueID) {
        let filter ="";
        if (!isNaN(venueID)){
              filter = "filter[where][VenueID]=" + venueID; //131
            }
            else {
              filter = "filter[where][VenueID]=0"; //131
            }
        const host = `${process.env.API_HOST}`;
        // const request = new Request(`${process.env.API_HOST}/sb_amenity?` + filter, {
        //   method: 'GET'
        // });
        const request = `${process.env.API_HOST}/sb_amenity?` + filter;
        return fetchWithDelay2(request)
        .then(handleErrors)
        .then(response => {
                return response.data;
            }).catch(error => {
                throw error;
            });
        }

    static getPointOfInterests(venueID) {
          let filter ="";
          if (!isNaN(venueID)){
                filter = "filter[where][VenueID]=" + venueID; //131
              }
              else {
                filter = "filter[where][VenueID]=0"; //131
              }
          const host = `${process.env.API_HOST}`;
        //   const request = new Request(`${process.env.API_HOST}/sb_poi?` + filter, {
        //     method: 'GET'
        //   });

          const request = `${process.env.API_HOST}/sb_poi?` + filter;
          return fetchWithDelay2(request)
          .then(handleErrors)
          .then(response => {
                  return response.data;
              }).catch(error => {
                  throw error;
              });
          }

    static getVenueByID(ID) {
      const host = `${process.env.API_HOST}`;
    //   const request = new Request(`${process.env.API_HOST}/sb_venue/`+ ID, {
    //     method: 'GET'
    //   });
      const request = `${process.env.API_HOST}/sb_venue/`+ ID;
      return fetchWithDelay2(request)
      .then(handleErrors)
      .then(response => {
              return response.data;
          }).catch(error => {
              throw error;
          });
      }

    static getFavorites() {
        let userID= localStorage["userid"];
        let filter ="";
        if (!isNaN(userID)){
              filter = "filter[where][UserID]=" + userID; //131
            }
            else {
              filter = "filter[where][UserID]=0"; //131
            }
        const host = `${process.env.API_HOST}`;
        // const request = new Request(`${process.env.API_HOST}/sb_favorites?` + filter, {
        //   method: 'GET'
        // });
        const request = `${process.env.API_HOST}/sb_favorites?` + filter;
        return fetchWithDelay2(request)
        .then(handleErrors)
        .then(response => {
                return response.data;
            }).catch(error => {
                throw error;
            });
        }

    static getScores() {
          const host = `${process.env.API_HOST}`;
        //   const request = new Request(`${process.env.API_HOST}/vwGameDetails`, {
        //     method: 'GET'
        //   });
          const request = `${process.env.API_HOST}/vwGameDetails`;
          try{
                  return fetchWithDelay2(request)
                  .then(handleErrors)
                  .then(response => {
                          return response.data;
                      }).catch(error => {
                          throw error;
                      });
             }
             catch(ex){
                  throw ex;
             }
    }

    static getScoresAvailableDates() {
        const host = `${process.env.API_HOST}`;
        // const request = new Request(`${process.env.API_HOST}/vwGetDates`, {
        //   method: 'GET'
        // });
        const request = `${process.env.API_HOST}/vwGetDates`;
        return fetchWithDelay2(request)
        .then(handleErrors)
        .then(response => {
                return response.data;
            }).catch(error => {
                throw error;
            });
        }

    static saveVenue(venue) {
            let url = "";
            if(venue.id == 0){
                     url =`${process.env.API_HOST}/sb_venue`;
                     delete venue["id"];
                }
            else{
                    url = `${process.env.API_HOST}/sb_venue/`+ venue.id + "/replace";
                }
            return axios
            .post(url,venue)
            .then(handleErrors)
             .then(response => {
              return response.data;
            }).catch(error => {
              throw error;
            });

          }

          static deleteVenue(venue) {
                  let tempVenue = Object.assign({}, venue);
                  let url = "";
                  tempVenue.Active = 0;

                  if(tempVenue.id > 0){
                          url = `${process.env.API_HOST}/sb_venue/`+ tempVenue.id + "/replace";
                      }
                  return axios
                  .post(url,tempVenue)
                  .then(handleErrors)
                   .then(response => {
                    return response.data;
                  }).catch(error => {
                    throw error;
                  });
                }

        static enableVenue(venue) {
              let tempVenue = Object.assign({}, venue);
                let url = "";
                tempVenue.Active = 1;
                if(tempVenue.id > 0){
                        url = `${process.env.API_HOST}/sb_venue/`+ tempVenue.id + "/replace";
                    }
                return axios
                .post(url,tempVenue)
                .then(handleErrors)
                 .then(response => {
                  return response.data;
                }).catch(error => {
                  throw error;
                });
              }


        static getAmenityByID(ID) {
            const host = `${process.env.API_HOST}`;
            const request = `${process.env.API_HOST}/sb_amenity/`+ ID;
            return fetchWithDelay2(request)
            .then(handleErrors)
            .then(response => {
                    return response.data;
                }).catch(error => {
                    throw error;
                });
            }

            static saveAmenity(amenity) {
                    let url = "";
                    if(amenity.id == 0){
                             url =`${process.env.API_HOST}/sb_amenity`;
                             delete amenity["id"];
                        }
                    else{
                            url = `${process.env.API_HOST}/sb_amenity/`+ amenity.id + "/replace";
                        }
                    return axios
                    .post(url,amenity)
                    .then(handleErrors)
                     .then(response => {
                      return response.data;
                    }).catch(error => {
                      throw error;
                    });

                  }

                  static deleteAmenity(amenity) {
                          let tempAmenity = Object.assign({}, amenity);
                          let url = "";
                          tempAmenity.Active = 0;
                          if(tempAmenity.id > 0){
                                  url = `${process.env.API_HOST}/sb_amenity/`+ tempAmenity.id + "/replace";
                              }
                          return axios
                          .post(url,tempAmenity)
                          .then(handleErrors)
                           .then(response => {
                            return response.data;
                          }).catch(error => {
                            throw error;
                          });
                        }

                static enableAmenity(amenity) {
                       let tempAmenity = Object.assign({}, amenity);
                        let url = "";
                        tempAmenity.Active = 1;
                        if(tempAmenity.id > 0){
                                url = `${process.env.API_HOST}/sb_amenity/`+ tempAmenity.id + "/replace";
                            }
                        return axios
                        .post(url,tempAmenity)
                        .then(handleErrors)
                         .then(response => {
                          return response.data;
                        }).catch(error => {
                          throw error;
                        });
                      }

          //-----------------------------------------------------------------------------7


                  static getPOIByID(ID) {
                      const host = `${process.env.API_HOST}`;
                      const request = `${process.env.API_HOST}/sb_poi/`+ ID;
                      return fetchWithDelay2(request)
                      .then(handleErrors)
                      .then(response => {
                              return response.data;
                          }).catch(error => {
                              throw error;
                          });
                      }

                      static savePOI(poi) {
                              let url = "";
                              if(poi.id == 0){
                                       url =`${process.env.API_HOST}/sb_poi`;
                                       delete poi["id"];
                                  }
                              else{
                                      url = `${process.env.API_HOST}/sb_poi/`+ poi.id + "/replace";
                                  }

                              return axios
                              .post(url,poi)
                              .then(handleErrors)
                               .then(response => {
                                return response.data;
                              }).catch(error => {
                                throw error;
                              });

                            }

                            static deletePOI(poi) {
                                   let temppoi = Object.assign({}, poi);
                                   let url = "";
                                    temppoi.Active = 0;
                                    if(temppoi.id > 0){
                                            url = `${process.env.API_HOST}/sb_poi/`+ temppoi.id + "/replace";
                                        }
                                    return axios
                                    .post(url,temppoi)
                                    .then(handleErrors)
                                     .then(response => {
                                      return response.data;
                                    }).catch(error => {
                                      throw error;
                                    });
                                  }

                          static enablePOI(poi) {
                                  let temppoi = Object.assign({}, poi);
                                  let url = "";
                                  temppoi.Active = 1;
                                  if(temppoi.id > 0){
                                          url = `${process.env.API_HOST}/sb_poi/`+ temppoi.id + "/replace";
                                      }
                                  return axios
                                  .post(url,temppoi)
                                  .then(handleErrors)
                                  .then(response => {
                                    return response.data;
                                  }).catch(error => {
                                    throw error;
                                  });
                                }


    }


export default VenuesApi;
