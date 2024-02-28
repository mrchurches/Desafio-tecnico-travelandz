import React, { useState } from 'react';

const SignIn = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isCreated, setIsCreated] = useState(false);

  const validateForm = () => {
    let errors = {};

    if (!fullName) {
      errors.fullName = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!phone) {
      errors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (!country) {
      errors.country = 'Country is required';
    }
    if (!password) {
        errors.password = 'Password is required';
      } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }
  
      if (!confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
        fetch('http://localhost:3001/auth/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, email, phone, country, password}),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log('User created:', data.user);
                setIsCreated(true);
            } else {
                console.log('Sign in failed:', data.error);
                setIsCreated(false);
            }
        })
    }
  };

  return (
    <div className='flex flex-col items-center gap-y-4 justify-center h-full'>
      <h2>Create an account on our site.</h2>
{     !isCreated && <form onSubmit={handleSubmit} className='flex flex-col items-center gap-y-4'>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <span>{errors.phone}</span>}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {errors.country && <span>{errors.country}</span>}
        </div>
        <div>
  <label htmlFor="password">Password:</label>
  <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  {errors.password && <span>{errors.password}</span>}
</div>
<div>
  <label htmlFor="confirmPassword">Confirm Password:</label>
  <input
    type="password"
    id="confirmPassword"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
</div>
        <button type="submit">Sign In</button>
      </form>}
      {isCreated &&
      <>
      <div>Account created successfully!</div>
      <div>Please verify your email address to activate your account.</div>
      </>
      }
    </div>
  );
};

export default SignIn;
