import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import ThemeToggle from '../../components/common/ThemeToggle';
import { Link2, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

import {AuthContext} from "../../context/AuthContext"

export default function ForgotPasswordPage() {

  const {forgetPassword, setError, error, isLoading, verifyOtp, setnewPassword} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handlePasswordSubmit = async e => {
    e.preventDefault();
     if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const email = localStorage.getItem("email")
    const res = await setnewPassword(email, password, confirmPassword)
    if(res?.success){
        setPasswordChanged(true);
        localStorage.removeItem("email")
    }
    
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    setOtp(current => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOTP = async (e) => {
     e.preventDefault()
     let OTP = otp.join('')
     const email = localStorage.getItem("email")
     setEmail(email)
     const res = await verifyOtp(email, OTP)
     if(res?.success){
      setOtpVerified(true)
     }

  }

    const handleSubmit = async e => {
      e.preventDefault();
      if (!email.trim()){
         setError("Please insert email")
         return
      } 
     const res = await forgetPassword(email)
     if(res?.success){
      console.log("yes")
      localStorage.setItem('email', res.data)
      setSent(true)
     }
   };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <div className="p-4 sm:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent flex items-center justify-center text-white shadow-md shadow-brand-500/25">
            <Link2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Linkly
          </span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              {passwordChanged ? (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Password changed successfully
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Your password has been updated. Return to login with your new password.
                  </p>
                  <Link to="/login" className="block">
                    <Button variant="electric" className="w-full" icon={ArrowLeft}>
                      Return to Login
                    </Button>
                  </Link>
                </>
              ) : otpVerified ? (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Create a new password
                  </h2>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-2 text-left">
                    <div>
                      <label htmlFor="new-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          id="new-password"
                          type="password"
                          required
                          minLength={8}
                          value={password}
                          onChange={e => (setPassword(e.target.value), setError(""))}
                          autoComplete="new-password"
                          className="w-full px-3 py-2 pr-12 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                        />
                        <button
                          type="button"
                          aria-controls="new-password"
                          aria-label="Show new password"
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-1 text-xs font-semibold text-brand-600 dark:text-brand-400"
                          onClick={e => {
                            const input = e.currentTarget.parentElement.querySelector('input');
                            const showing = input.type === 'text';
                            input.type = showing ? 'password' : 'text';
                            e.currentTarget.textContent = showing ? 'Show' : 'Hide';
                            e.currentTarget.setAttribute('aria-label', showing ? 'Show new password' : 'Hide new password');
                            e.currentTarget.setAttribute('aria-pressed', showing ? 'false' : 'true');
                          }}
                        >
                          Show
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirm-password"
                          type="password"
                          required
                          minLength={8}
                          value={confirmPassword}
                          onChange={e => (setConfirmPassword(e.target.value), setError(""))}
                          autoComplete="new-password"
                          className="w-full px-3 py-2 pr-12 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                        />
                        <button
                          type="button"
                          aria-controls="confirm-password"
                          aria-label="Show confirm password"
                          aria-pressed="false"
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-1 text-xs font-semibold text-brand-600 dark:text-brand-400"
                          onClick={e => {
                            const input = e.currentTarget.parentElement.querySelector('input');
                            const showing = input.type === 'text';
                            input.type = showing ? 'password' : 'text';
                            e.currentTarget.textContent = showing ? 'Show' : 'Hide';
                            e.currentTarget.setAttribute('aria-label', showing ? 'Show confirm password' : 'Hide confirm password');
                            e.currentTarget.setAttribute('aria-pressed', showing ? 'false' : 'true');
                          }}
                        >
                          Show
                        </button>
                      </div>
                    </div>
                    {error && <p className="text-xs text-red-600" role="alert">{error}</p>}
                    <Button type="submit" loading={isLoading} variant="electric" size="lg" className="w-full">
                      Change Password
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Enter your verification code
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    We've sent a 6-digit code to <strong>{email}</strong>.
                  </p>
                  <form onSubmit={handleOTP} className="space-y-5 pt-2">
                    <div className="flex justify-center gap-2" aria-label="6-digit verification code">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          required
                          value={digit}
                          onChange={e => (handleOtpChange(index, e.target.value), setError(""))}
                          onKeyDown={e => {
                            if (e.key === 'Backspace' && !digit && index > 0) {
                              document.getElementById(`otp-${index - 1}`)?.focus();
                            }
                          }}
                          aria-label={`Digit ${index + 1}`}
                          className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                        />
                      ))}
                    </div>
                    {error ? (
                      <span className="block text-center text-sm font-medium text-red-600 dark:text-red-400">
                        {error}
                      </span>
                    ) : null}
                    <Button type="submit" loading={isLoading} variant="electric" size="lg" className="w-full">
                      Verify Code
                    </Button>
                  </form>
                  <div>
                    <Link to="/login">
                      <Button variant="outline" className="w-full" icon={ArrowLeft}>
                        Return to Login
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Reset your password
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                  Enter your account email and we will send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">     
              {error ? <span className="block w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400" role="alert">{error}</span>: ""}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e =>( setEmail(e.target.value), setError(""))}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <Button
                  type="submit"
                  variant="electric"
                  size="lg"
                  className="w-full mt-2"
                  loading={isLoading}
                >
                  Send OTP
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Linkly, Inc. All rights reserved.
      </div>
    </div>
  );
}
