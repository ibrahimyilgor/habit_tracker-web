import { createContext, useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './auth-context';

export const RestaurantContext = createContext({ undefined });

export const RestaurantProvider = (props) => {
  const { children } = props;
  const [restaurants, setRestaurants] = useState([])
  const router = useRouter();
  const state = useAuthContext()

  useEffect(() => {
    console.log("restaurants",restaurants, state)
  }, [restaurants])

  useEffect(
    () => {
      let tempUser = window.sessionStorage.getItem('user')
      if(tempUser){
        tempUser = JSON.parse(tempUser)
      }
      console.log("tempUser", tempUser)
      if(tempUser?.token){
        getBranches(tempUser?.user?._id, tempUser?.token)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state?.user?.token]
  );

  const getBranches = async (id, token) => {
    console.log("restaurants3", state)
    const restaurantResponse = await fetch(
        "http://localhost:3001/restaurant/" + id,
        {
          method: "GET",
          headers: {"Authorization": "Bearer " + token }
        }
      )
      const tempRestaurant = await restaurantResponse.json()

      console.log("tempRestaurant", tempRestaurant)

      setRestaurants(tempRestaurant)

      return tempRestaurant
  };

    const addBranch = async ({id, name, address, phone}) => {
      console.log("ibrahim2",name)
      try {
        const response = await fetch(`http://localhost:3001/restaurant/${id}/addBranch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + state?.user?.token
          },
          body: JSON.stringify({
            name,
            address,
            phone
          })
        });
  
        const data = await response.json();
  
        console.log(data.message);
        console.log(data.restaurant);
      } catch (err) {
        console.error(err);
      }
    };

  

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        getBranches,
        addBranch
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

RestaurantProvider.propTypes = {
  children: PropTypes.node
};

export const RestaurantConsumer = RestaurantContext.Consumer;

export const useRestaurantContext = () => useContext(RestaurantContext);
