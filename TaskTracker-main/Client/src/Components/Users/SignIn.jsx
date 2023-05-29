import React, { useEffect, useState } from 'react'
import '../../CSS/Users.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function SignIn({ updateIsLog }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [path, setPath] = useState('/');
  const [accessToken, setAccessToken] = useState(false);


  useEffect(() => {
    setAccessToken(JSON.parse(localStorage.getItem('token')));

    if (accessToken) {
      checkToken().then(
        (resultUsers) => {
          localStorage.setItem("user", JSON.stringify(resultUsers))
          navigate(path);
        }
      );
    }
  });


  const themeValue = {
    success: "green",
    error: "red",
    warning: "red",
    normal: "blue"
  }

  const [inputTheme, setInputTheme] = useState({
    email: themeValue.normal,
    password: themeValue.normal
  });

  const [massageWarning, setMassageWarning] = useState({
    email: '',
    password: ''
  })

  function handleEmail(event) {
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
    const email = event.target.value;

    if (email === '') {
      setInputTheme({ ...inputTheme, email: themeValue.normal });
      setMassageWarning({ ...massageWarning, email: '' });
    }
    else if (!patternEmail.test(email)) {
      setInputTheme({ ...inputTheme, email: themeValue.error });
      setMassageWarning({ ...massageWarning, email: 'Invalid email' });
    }
    else {
      setMassageWarning({ ...massageWarning, email: '' });
      setInputTheme({ ...inputTheme, email: themeValue.success });
      setUser({ ...user, email: email });
    }
  }

  function handlePassword(event) {
    const patternPassword = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
    const password = event.target.value;

    if (password === '') {
      setInputTheme({ ...inputTheme, password: themeValue.normal });
      setMassageWarning({ ...massageWarning, password: '' });
    }
    else if (!patternPassword.test(password)) {
      setInputTheme({ ...inputTheme, password: themeValue.error });
      setMassageWarning({ ...massageWarning, password: 'Invalid password' })
    }
    else {
      setMassageWarning({ ...massageWarning, password: '' });
      setInputTheme({ ...inputTheme, password: themeValue.success });
      setUser({ ...user, password: password });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const userCheck = await checkUsers(email, password);
    const token = await checkToken();

    if (token) {
      localStorage.setItem("user", JSON.stringify(token))

      updateIsLog(true);
      event.target.reset();
      navigate(path);
    }
    else if (userCheck) {

      localStorage.setItem("user", JSON.stringify(userCheck))
      await axios.post('http://localhost:5000/createToken', userCheck).then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data))
        console.log(res)
      }).catch((err) => {
        console.log(err);
      })

      updateIsLog(true);
      event.target.reset();
      navigate(path);
    }
    else {
      setMassageWarning({ ...massageWarning, submit: 'Password or email is incorrect.' });
      setInputTheme({ ...inputTheme, email: themeValue.error, password: themeValue.error });
    }
  }

  async function checkToken() {
    try {
      const response = await axios.get("http://localhost:5000/LogIn", {
        headers: {
          'authorization': `Bearer ${accessToken}`
        }
      });
      return response.data;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function checkUsers(email, password) {
    try {
      const response = await axios.get("http://localhost:5000/");

      const result = response.data.filter((user) => {
        return user.email === email && user.password === password;
      });
      return result[0];

    } catch (error) {
      console.log(error);
      return null;
    }
  }


  return (
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">


      <div class="max-w-screen-lg m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">


        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 sm:w-10/12">

          <div class="mt-12 flex flex-col items-center">
            <h1 class="text-2xl xl:text-3xl font-extrabold text-blue-600 ">
              Sign in your account
            </h1>
            <div class="w-full flex-1 mt-8">
              <form onSubmit={(event) => handleSubmit(event)}>
                <div class="mx-auto max-w-xs">
                  <div class="mb-6">
                    <label for="email" className={`block mb-2 text-sm font-medium text-${inputTheme.email}-700 dark:text-${inputTheme.email}-500 `}>Email</label>
                    <input onChange={(event) => handleEmail(event)} type="text" id="email" className={`border-${inputTheme.email}-300 text-${inputTheme.email}-900 dark:text-${inputTheme.email}-400 placeholder-${inputTheme.email}-700 dark:placeholder-${inputTheme.email}-500 focus:ring-${inputTheme.email}-500 focus:border-${inputTheme.email}-500 dark:border-${inputTheme.email}-500 bg-white border-2 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 focus:outline-none`} placeholder="Enter your email" />
                    <p className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}>{massageWarning.email}<span class="font-medium"></span></p>
                  </div>
                  <div>
                    <label for="password" className={`text-${inputTheme.password}-700 dark:text-${inputTheme.password}-500 block mb-2 text-sm font-medium`}>Password</label>
                    <input onChange={(event) => handlePassword(event)} type="password" id="password" className={`border-${inputTheme.password}-300 text-${inputTheme.password}-900 placeholder-${inputTheme.password}-700 focus:ring-${inputTheme.password}-500 focus:border-${inputTheme.password}-500 dark:text-${inputTheme.password}-500 dark:placeholder-${inputTheme.password}-500 dark:border-${inputTheme.password}-500 bg-white border-2 text-sm rounded-lg dark:bg-gray-700 block w-full p-2.5 focus:outline-none`} placeholder="Enter your password" />
                    <p className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}><span class="font-medium">{massageWarning.password}</span></p>
                  </div>
                  <button type='submit'
                    class="mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-4 rounded-lg hover:text-blue-600 hover:bg-gray-200 transition-bg duration-500 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      class="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                    </svg>
                    <span class="ml-3 ">
                      Sign in
                    </span>
                  </button>
                  <p className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}><span class="font-medium">{massageWarning.submit}</span></p>
                  <p className={`mt-2 text-sm text-${themeValue.normal}-600 dark:text-${themeValue.normal}-500`}>Don't have an account! <Link to={path === "/payment" ? { pathname: "/signUp", search: "CheckOut" } : "/signUp"} className={`font-bold text-${themeValue.normal}-600 transition hover:text-${themeValue.normal}-500/75`}>Sign Up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
