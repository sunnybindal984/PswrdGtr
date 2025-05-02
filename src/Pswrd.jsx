import React, { useCallback, useEffect, useRef, useState } from "react";

const Pswrd = () => {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  // console.log(numAllow);
  // console.log(charAllow);

  const pswrdGtr = useCallback(() => {
    let str = "asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM";
    if (numAllow) str += "1234567890";
    if (charAllow) str += "!@#$%^&*()";
    let pass = "";
    for (let index = 1; index <= length; index++) {
      let str2 = Math.floor(Math.random() * str.length);
      pass += str.charAt(str2);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow]);
  console.log(password);
  const passwordRef = useRef(null);
  const passwordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    pswrdGtr();
  }, [numAllow, length, charAllow]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "7px",
        borderRadius: "15px",
        boxShadow: "2px 2px 2px 2px grey",
        alignItems: "center",
        backgroundColor: "white",
        width: "440px",
        height: "180px",
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: "gold" }}>Password Creator</h1>
      <div>
        <input
          ref={passwordRef}
          type="text"
          value={password}
          readOnly
          placeholder="Password"
        />
        <button onClick={passwordToClipboard}>Copy</button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          // justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div style={{ display: "flex" }}>
          <input
            type="range"
            min={8}
            max={30}
            name="Length"
            onChange={(e) => setLength(e.target.value)}
          />

          <label htmlFor="num">Lengh:{length}</label>
        </div>
        <div>
          <label htmlFor="num">Numbers:</label>
          <input
            type="checkbox"
            onChange={() => {
              setNumAllow((prev) => !prev);
            }}
            defaultChecked={numAllow}
            name="Numbers"
            id="num"
          />
        </div>
        <div>
          <label htmlFor="char">Character:</label>
          <input
            type="checkbox"
            defaultChecked={charAllow}
            onChange={() => setCharAllow((pre) => !pre)}
            name="Characters"
            id="char"
          />
        </div>
      </div>
    </div>
  );
};

export default Pswrd;
