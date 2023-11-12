import React, { useState } from 'react';
import Input from './input';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [sending, setSending] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('ایمیل خود را بصورت درست وارد نمایید.').required('ایمیل خود را وارد نمایید.'),
    password: yup.string().min(4, 'حداقل باید از 4 کاراکتر استفاده نمایید.').required('رمز عبور خود را وارد نکرده اید.'),
  });

  const validate = async () => {
    try {
      await schema.validate(account, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await validate();
    console.log(result);

    if (result) {
      try {
        setSending(true);
        const response = await axios.post('https://reqres.in/api/login', account);
        console.log(response);
        setSending(false);
        localStorage.setItem('token', response.data.token);
        // navigate('/dashboard'); // Use navigate to change the route
        window.location = './dashboard';
      } catch (error) {
        setErrors(['رمز یا ایمیل اشتباه وارد شده است']);
        setSending(false);
      }
    }
  };

  const handleChange = (e) => {
    const input = e.currentTarget;
    setAccount({
      ...account,
      [input.name]: input.value,
    });
  };

  return (
    <>
      {errors.length !== 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input name="email" label="email" value={account.email} onChange={handleChange} />
        <Input name="password" label="password" value={account.password} onChange={handleChange} />
        <button disabled={sending} className="btn btn-info">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
