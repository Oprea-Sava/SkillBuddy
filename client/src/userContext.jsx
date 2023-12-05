import React, { useState, createContext, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const UserContext = createContext(null);

export function UserProvider ({children}){
    const [userData, setUserData]= useState(null)

    function handleData(data){
        setUserData(data);
    }

    const contextValue = {
        userData,
        handleData,
    };
    
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/users/${token}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
            const data = await response.json();
            setUserData(data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        // const fetchUserImg = async() => {
        //     try{
        //         const token = localStorage.getItem('token');
        //         const response = await fetch(`http://localhost:5000/api/users/retrieve/${token}`)
        //         if(!response.ok){
        //             throw new Error(`HTTP error! Status: ${response.status}`)
        //         }
    
        //         const imageBlob = await response.blob();
        //         const imageUrl = URL.createObjectURL(imageBlob)
        //         console.log(imageUrl);
        //         setUserData((prevUserData) => ({
        //             ...prevUserData,
        //             img: imageUrl,
        //           }));
        //     } catch(error){
        //         console.error('Error fetching user image:', error);
        //     }
        // }
        fetchUserData();
        console.log(userData);
      }, []);

      if (userData === null) {
        //Render a loading state until user data is fetched
        return <div className="loaderContainer"><ClipLoader color="#683bd8"/></div>
    }

    return (
        <UserContext.Provider value = {contextValue}>
            {children}
            {console.log(userData)}
        </UserContext.Provider>
    );

    
};

export default UserContext;




