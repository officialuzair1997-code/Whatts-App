import React from 'react';
import ForgetPassword from '../../components/forget/ForgetPassword';
import SendOTP from '../../components/forget/SendOTP';
import UpdatePassword from '../../components/forget/UpdatePassword';
import { useState } from 'react';

function ForgetPage() {
  const [step, setStep] = useState('forget'); // forget, otp, update

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0e1e25]">
      {step === 'forget' && <ForgetPassword onNext={() => setStep('otp')} />}
      {step === 'otp' && <SendOTP onNext={() => setStep('update')} />}
      {step === 'update' && <UpdatePassword onNext={() => console.log('Done')} />}
    </div>
  );
}

export default ForgetPage;
