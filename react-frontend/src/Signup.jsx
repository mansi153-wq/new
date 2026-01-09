import { useState } from 'react';

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
    <div style={{ padding: 40 }}>
      <h2>Customer Signup</h2>

      <input placeholder="Name" value={name}
        onChange={e => setName(e.target.value)} /><br /><br />

      <input placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} /><br /><br />

      <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)} /><br /><br />

      <input placeholder="Mobile" value={mobile}
        onChange={e => setMobile(e.target.value)} /><br /><br />

      <button onClick={signup}>Signup</button>

      {showOtp && (
        <>
          <br /><br />
          <input placeholder="Enter OTP" value={otp}
            onChange={e => setOtp(e.target.value)} /><br /><br />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default Signup;
