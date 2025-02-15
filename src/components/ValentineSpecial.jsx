import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button"; // Ensure Button.js exists
import "./ValentineSpecial.css"; // Ensure ValentineSpecial.css exists

export default function ValentineSpecial() {
  const [love, setLove] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "55%", left: "55%" });
  const [noClicked, setNoClicked] = useState(false);

  const handleYes = () => setLove(true);

  const moveNoButton = () => {
    const randomX = Math.random() * 90 + "%";
    const randomY = Math.random() * 90 + "%";
    setNoPosition({ top: randomY, left: randomX });
  };

  const handleMouseMove = (event) => {
    const button = document.getElementById("no-button");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      (cursorX - buttonX) ** 2 + (cursorY - buttonY) ** 2
    );

    if (distance < 100) {
      moveNoButton();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-pink-100 text-center p-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-red-600 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {love ? "I Love You, will you ?! ❤️" : "Will you be my Valentine? 💖"}
      </motion.h1>

      {!love && (
        <div className="relative flex justify-center items-center w-full mt-4">
          {/* YES Button */}
          <Button
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-xl hover:bg-green-600 relative"
            onClick={handleYes}
          >
            Yes 💘
          </Button>

          {/* NO Button - Moves when clicked or cursor is near */}
          <motion.button
            id="no-button"
            className="bg-red-500 text-white px-6 py-3 font-bold rounded-lg text-xl absolute"
            style={{ top: noPosition.top, left: noPosition.left, position:"absolute"}}
            animate={noClicked ? { x: Math.random() * 100 - 50, y: Math.random() * 80 - 40 } : {}}
            onClick={() => {
              setNoClicked(true);
              moveNoButton();
            }}
          >
            No 💔
          </motion.button>
        </div>
      )}

      {love && (
        <>
          <motion.h1
            className="absolute text-6xl font-bold text-red-600"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 5 }}
          >
            Kitna bhao kha rahi ho!<br/> Chalo theek hai, maine "Yes" maan liya! ❤️
          </motion.h1>

          {/* Floating hearts animation (upward) */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{ opacity: 1, y: "100vh" }}
                animate={{ opacity: 1, y: "-40vh" }}
                transition={{ duration: 3, delay: Math.random() * 2, repeat: Infinity }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "100vh",
                }}
              >
                ❤️❤️😍😘🥰❤️❤️I LOVE YOU❤️❤️😍😘🥰❤️❤️I Miss YOU❤️❤️😍😘🥰❤️❤️I LOVE YOU❤️❤️❤️❤️❤️❤️I Miss YOU❤️❤️❤️😍😘🥰❤️❤️❤️I LOVE YOU❤️❤️❤️😍😘🥰❤️❤️❤️I Miss YOU❤️❤️❤️❤️❤️❤️I LOVE YOU❤️❤️❤️❤️❤️❤️I Miss YOU❤️❤️❤️❤️❤️❤️
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
