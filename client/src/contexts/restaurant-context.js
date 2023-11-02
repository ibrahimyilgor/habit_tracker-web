import { createContext, useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./auth-context";

export const RestaurantContext = createContext({ undefined });

export const RestaurantProvider = (props) => {
  const { children } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [selectedBranchIds, setSelectedBranchIds] = useState([]);
  const router = useRouter();
  const state = useAuthContext();

  useEffect(() => {
    console.log("restaurantss", restaurants, state);
  }, [restaurants]);

  useEffect(
    () => {
      if (state?.user?.token) {
        getBranches(state?.user?.user?._id, state?.user?.token, null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state?.user?.token],
  );

  const getBranches = async (id, token, name = null) => {
    const restaurantResponse = await fetch(`http://localhost:3001/restaurant/${id}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const tempRestaurant = await restaurantResponse.json();

    console.log("tempRestaurant", tempRestaurant);

    setRestaurants(tempRestaurant);

    return tempRestaurant;
  };

  const addBranch = async ({ id, name, address, phone }) => {
    console.log("ibrahim2", name);
    try {
      const response = await fetch(`http://localhost:3001/restaurant/${id}/addBranch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
        body: JSON.stringify({
          name,
          address,
          phone,
        }),
      });

      const data = await response.json();
      if (data.restaurant) {
        data.success = true;
      } else {
        data.success = false;
      }
      console.log(data.message);
      console.log(data.restaurant);
      return data;
    } catch (err) {
      err.success = false;
      console.error(err);
      return err;
    }
  };

  const deleteBranch = async (id, userId) => {
    console.log("ibrahimmm", id);
    try {
      const response = await fetch(
        `http://localhost:3001/restaurant/${id}/${userId}/deleteBranch`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + state?.user?.token,
          },
        },
      );
      const data = await response.json();
      if (selectedBranchIds.includes(id)) {
        // Remove from branch selector if the branch is selected
        var index = selectedBranchIds.indexOf(id);
        if (index !== -1) {
          selectedBranchIds.splice(index, 1);
        }
      }
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        getBranches,
        addBranch,
        deleteBranch,
        selectedBranchIds,
        setSelectedBranchIds,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

RestaurantProvider.propTypes = {
  children: PropTypes.node,
};

export const RestaurantConsumer = RestaurantContext.Consumer;

export const useRestaurantContext = () => useContext(RestaurantContext);
