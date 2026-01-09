import { useState } from 'react';
import './Signup.css'; // ✅ Component-specific CSS

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const signup = async () => {
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
        <div className="logo-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            className="logo react"
            alt="logo"
          />
        </div>
        <h2>Customer Signup</h2>

        <div className="input-group">
          <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder=" " />
          <label>Name</label>
        </div>

        <div className="input-group">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder=" " />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder=" " />
          <label>Password</label>
        </div>

        <div className="input-group">
          <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} required placeholder=" " />
          <label>Mobile</label>
        </div>

        <button className="primary-btn" onClick={signup}>Signup</button>

        {showOtp && (
          <div className="otp-section">
            <div className="input-group">
              <input type="text" value={otp} onChange={e => setOtp(e.target.value)} required placeholder=" " />
              <label>Enter OTP</label>
            </div>
            <button className="primary-btn" onClick={verifyOtp}>Verify OTP</button>
          </div>
        )}

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Signup;
