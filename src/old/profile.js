// import React, {useContext, useEffect, useState} from 'react';
// import {MainContext} from '../services/MainContext';
//
// const Profile = (props) => {
//     const {jwt} = useContext(MainContext);
//     const [parsedJwt, updateParsedJwt] = useState('')
//     useEffect(() => {
//         try {
//             updateParsedJwt(JSON.parse(atob(jwt.split('.')[1])))
//         } catch (err) {
//             updateParsedJwt('Not a valid JWT found')
//         }
//     }, [jwt]);
//
//     return (
//         <div>
//             {JSON.stringify(parsedJwt)}
//         </div>
//     )
// }
//
// export default Profile;