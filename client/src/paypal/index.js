import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useAuthContext } from "src/contexts/auth-context";

const PayPalIntegration = ({
  price,
  month,
  setSnackbarOpen,
  setSnackbarSeverity,
  setSnackbarMessage,
}) => {
  const state = useAuthContext();

  return (
    <div>
      <PayPalButton
        amount={price}
        onSuccess={async (details, data) => {
          try {
            const response = await fetch(
              process.env.NEXT_PUBLIC_BACKEND_SERVER + "/planCode/paypalSuccess",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + state?.user?.token,
                },
                body: JSON.stringify({
                  plan_id: id,
                  month: month,
                  user_id: state?.user?.user?._id,
                }),
              },
            );
            const data = await response.json();
            console.log("theresponse", data);
            if (data.success === true) {
              setSnackbarOpen(true);
              setSnackbarSeverity("success");
              setSnackbarMessage(t("plan.successMessage"));
            } else {
              setSnackbarOpen(true);
              setSnackbarSeverity("error");
              setSnackbarMessage(t("plan.errorMessage"));
            }
            state.getUser(state?.user?.user?._id);
            if (state?.user?.token) {
              restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null);
            }
            return data;
          } catch (error) {
            console.error("Error updating user:", error);
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setSnackbarMessage(t("plan.errorMessage"));
          }
        }}
        options={{
          vault: true,
          "client-id": "sb",
        }}
        message={{
          align: "center",
        }}
      />
    </div>
  );
};

export default PayPalIntegration;
