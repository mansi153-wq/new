/*
import { useState } from 'react';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  // ===== Validation Helpers =====
  const validateName = value =>
    /^[A-Za-z ]{3,}$/.test(value)
      ? ''
      : 'Name must be at least 3 letters';

  const validateEmail = value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ''
      : 'Enter a valid email address';

  const validatePassword = value =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
      ? ''
      : 'Password must be 8+ chars, include A–Z, a–z, 0–9';

  const validateMobile = value =>
    /^[0-9]{10}$/.test(value)
      ? ''
      : 'Enter a valid mobile number (10 digits)';

  // ===== Real-time Handlers =====
  const handleName = e => {
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({ ...prev, name: validateName(value) }));
  };

  const handleEmail = e => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePassword = e => {
    const value = e.target.value;
    setPassword(value);
    setErrors(prev => ({ ...prev, password: validatePassword(value) }));
  };

  const handleMobile = e => {
    const value = e.target.value.replace(/\D/g, '');
    setMobile(value);
    setErrors(prev => ({ ...prev, mobile: validateMobile(value) }));
  };

  // ===== Submit =====
  const signup = async () => {
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      mobile: validateMobile(mobile)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err)) return;

    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, mobile })
    });

    const text = await res.text();
    setMessage(text);
    if (res.status === 200) setShowOtp(true);
  };

  const verifyOtp = async () => {
    if (!/^[0-9]{4,6}$/.test(otp)) {
      setMessage('OTP must be numeric (4–6 digits)');
      return;
    }

    const res = await fetch('http://localhost:3000/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });

    const text = await res.text();
    setMessage(text);
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Customer Signup</h2>
        

        {}
        <div className="input-group">
          <input type="text" value={name} onChange={handleName} />
          <label>Name</label>
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        {}
        <div className="input-group">
          <input type="email" value={email} onChange={handleEmail} />
          <label>Email</label>
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        {}
        <div className="input-group">
          <input type="password" value={password} onChange={handlePassword} />
          <label>Password</label>
          {errors.password && <small className="error">{errors.password}</small>}
        </div>

        {}
        <div className="input-group">
          <input
            type="text"
            value={mobile}
            onChange={handleMobile}
            maxLength="10"
          />
          <label>Mobile</label>
          {errors.mobile && <small className="error">{errors.mobile}</small>}
        </div>

        <button
          className="primary-btn"
          onClick={signup}
          disabled={Object.values(errors).some(err => err)}
        >
          Signup
        </button>

        {showOtp && (
          <div className="otp-section">
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength="6"
              placeholder="Enter OTP"
            />
            <button className="primary-btn" onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>
        )}

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Signup;
*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  // ===== Validation Helpers =====
  const validateName = v =>
    /^[A-Za-z ]{3,}$/.test(v) ? '' : 'Name must be at least 3 letters';

  const validateEmail = v =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter valid email';

  const validatePassword = v =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v)
      ? ''
      : '8+ chars with A–Z, a–z, 0–9';

  const validateMobile = v =>
    /^[0-9]{10}$/.test(v) ? '' : 'Enter 10 digit mobile';

  // ===== Handlers =====
  const handleName = e => {
    const v = e.target.value;
    setName(v);
    setErrors(p => ({ ...p, name: validateName(v) }));
  };

  const handleEmail = e => {
    const v = e.target.value;
    setEmail(v);
    setErrors(p => ({ ...p, email: validateEmail(v) }));
  };

  const handlePassword = e => {
    const v = e.target.value;
    setPassword(v);
    setErrors(p => ({ ...p, password: validatePassword(v) }));
  };

  const handleMobile = e => {
    const v = e.target.value.replace(/\D/g, '');
    setMobile(v);
    setErrors(p => ({ ...p, mobile: validateMobile(v) }));
  };

  // ===== Signup =====
  const signup = async () => {
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      mobile: validateMobile(mobile)
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(e => e)) return;

    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, mobile })
    });

    const text = await res.text();
    setMessage(text);
    if (res.status === 200) setShowOtp(true);
  };

  // ===== OTP =====
  const verifyOtp = async () => {
    if (!/^[0-9]{4,6}$/.test(otp)) {
      setMessage('OTP must be 4–6 digits');
      return;
    }

    const res = await fetch('http://localhost:3000/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });

    const text = await res.text();
    setMessage(text);
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Customer Signup</h2>

        <div className="input-group">
          <input type="text" value={name} onChange={handleName} placeholder=" " />
          <label>Name</label>
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="input-group">
          <input type="email" value={email} onChange={handleEmail} placeholder=" " />
          <label>Email</label>
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="input-group">
          <input type="password" value={password} onChange={handlePassword} placeholder=" " />
          <label>Password</label>
          {errors.password && <small className="error">{errors.password}</small>}
        </div>

        <div className="input-group">
          <input type="text" value={mobile} onChange={handleMobile} maxLength="10" placeholder=" " />
          <label>Mobile</label>
          {errors.mobile && <small className="error">{errors.mobile}</small>}
        </div>

        <button className="primary-btn" onClick={signup}>
          Signup
        </button>

        <button className="secondary-btn" onClick={() => navigate('/')}>
          Back to Homepage
        </button>

        {showOtp && (
          <div className="otp-section">
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength="6"
              placeholder="Enter OTP"
            />
            <button className="primary-btn" onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>
        )}

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Signup;

