import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);
  const addInputVal = (value, i) => {
    const newOtp = [...otp];
    newOtp[i] = value;
    setOtp(newOtp);
  };
  const handleInputChange = (e, i) => {
    addInputVal(inputRef.current[i].value, i);
    if (i < length - 1) {
      inputRef.current[i + 1].focus();
    }
  };
  const handleKeyDown = (e, i) => {
    if (e.keyCode === 8) {
      addInputVal("", i);
      if (i > 0) {
        inputRef.current[i - 1].focus();
      }
      e.preventDefault();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const newOtp = [...otp];
    let copiedValue = e.clipboardData.getData("text");
    copiedValue.split("").map((cp, i) => (newOtp[i] = cp));
    setOtp(newOtp);
    inputRef.current[copiedValue.length - 1].focus();
  };

  useEffect(() => {
    inputRef.current[0].focus();
    1234;
  }, []);
  return (
    <div>
      <h1>Type/Paste OTP</h1>
      <div
        onPaste={handlePaste}
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {otp.map((val, i) => {
          return (
            <input
              key={i}
              maxLength={1}
              id={i}
              ref={(el) => (inputRef.current[i] = el)}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              value={val}
              style={{
                width: "40px",
                height: "40px",
                fontSize: "25px",
                textAlign: "center",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OtpInput;
