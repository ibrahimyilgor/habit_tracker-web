import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import i18n from 'src/i18n'

export const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const router = useRouter();

  useEffect(() => {
    console.log("state",state)
  }, [state])

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('user') !== null;
    } catch (err) {
      console.error(err);
    }

    let tempUser = window.sessionStorage.getItem('user')
    if(tempUser){
      tempUser = JSON.parse(tempUser)
    }
    console.log("tempuser",tempUser)

    if (isAuthenticated) {
        const user = {
          token: tempUser?.token,
          user: {
            _id: tempUser?.user?._id,
            logo: tempUser?.user?.logo,
            name: tempUser?.user?.name,
            createdAt: tempUser?.user?.createdAt,
            email: tempUser?.user?.email,
            address: tempUser?.user?.address,
            phone: tempUser?.user?.phone,
            restaurants: tempUser?.user?.restaurants
          }
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
      i18n.changeLanguage(localStorage.getItem('language') || navigator.language || "en")
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getUser = async (id) => {
    const userResponse = await fetch(
        "http://localhost:3001/user/" + id,
        {
          method: "GET",
          headers: {"Authorization": "Bearer " + state?.user?.token }
        }
      )
      const tempUser = await userResponse.json()

      console.log("user", tempUser)

      const image = new Image();

      const user = {
        token: state?.user?.token,
        user: {
          _id: tempUser?._id,
          name: tempUser?.name,
          createdAt: tempUser?.createdAt,
          email: tempUser?.email,
          address: tempUser?.address,
          phone: tempUser?.phone,
          restaurants: tempUser?.restaurants,
          logo: tempUser?.logo
        }
    };

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      })

      window.sessionStorage.setItem('user', JSON.stringify(user))

      return tempUser
    };

    const deleteUser = async (id) => {
      try {
        const response = await fetch(`http://localhost:3001/user/${id}/deleteUser`, {
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + state?.user?.token
          },
        });
        const data = await response.json();

        dispatch({
          type: HANDLERS.SIGN_OUT
        })
        sessionStorage.removeItem('user');
        return {success: true}
      } catch (error) {
        console.log("errorr",error)
        return {success: false}
      }
    };

    const updatePassword = async (id, password) => {
      try {
        const response = await fetch("http://localhost:3001/auth/updatePassword", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + state?.user?.token
          },
          body: JSON.stringify({ _id: id, password: password })
        });
        const data = await response.json();
        console.log("submit", data)

      return data;
      } catch (error) {
        console.log("errorr",error)
        return {success: false}
      }
    };

  const signIn = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values)
      }
    )
    const loggedIn = await loggedInResponse.json()

    console.log("saveduser",loggedIn)

    if (loggedIn.token){
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: loggedIn
      })
      window.sessionStorage.setItem('user', JSON.stringify(loggedIn))
      router.push('/');
    }

    return loggedIn

  };

  const signUp = async (formData) => {

    const password = formData.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    formData.password = hashedPassword

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData
      }
    )

    const savedUser = await savedUserResponse.json();
    console.log("saveduser",savedUser)
    return savedUser

  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        getUser,
        deleteUser,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
