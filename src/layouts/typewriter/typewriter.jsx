import React, { useState } from "react";
import "./typewriter.css";
export default function Typewriter({ content }) {
  const [text, setText] = useState("");
  const [index, set_i] = useState(0);
  function typewriter(banner, i) {
    let bannerLength = banner.length;
    let currentElement = banner[i];

    if (index < bannerLength) {
      let j = 0;

      const adding = setInterval(() => {
        if (j <= currentElement.length) {
          setText(currentElement.slice(0, j));
          j++;
        } else {
          clearInterval(adding);

          setTimeout(() => {
            const remove = setInterval(() => {
              if (currentElement.length > 0) {
                currentElement = currentElement.slice(0, -1);
                setText(currentElement);
              } else {
                clearInterval(remove);
                set_i(i + 1);
              }
            }, 30);
          }, 1000);
        }
      }, 30);
    } else {
      set_i(0);
    }
  }
  React.useEffect(() => {
    if (content) {
      typewriter(content, index);
    }
  }, [index]);

  return (
    <div className="typewriter">
      <p className="typewriter-text margin-5">{text}</p>
      <div className="blinker"></div>
    </div>
  );
}
