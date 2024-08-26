import { useAppContext } from "@/context/appContext";
import React, { useEffect, useState } from "react";

const HTMLContent = ({ contentString, blogCutOff }) => {
  const { isSubscribed } = useAppContext();
  const [htmlStrings, setHtmlStrings] = useState([]);

  useEffect(() => {
    // Define custom styles for different HTML elements
    const customStyles = {
      h3: "text-3xl font-bold mb-4",
      p: "mb-4",
      img: "max-w-full h-auto",
      a: "text-blue-500 hover:text-blue-700",
      ol: "list-decimal list-inside mb-4",
      li: "ml-4",
    };

    // Replace HTML tags with styled equivalents
    const styledContent = contentString
      .replace(/<h3>/g, `<h3 class="${customStyles.h3}">`)
      .replace(/<p>/g, `<p class="${customStyles.p}">`)
      .replace(/<img /g, `<img class="${customStyles.img}" `)
      .replace(/<a /g, `<a target="_blank" class="${customStyles.a}" `)
      .replace(/<ol>/g, `<ol class="${customStyles.ol}">`)
      .replace(/<li>/g, `<li class="${customStyles.li}">`);

    const tempElement = document.createElement("div");
    tempElement.innerHTML = styledContent;

    // Extract the top-level elements
    const topLevelElements = Array.from(tempElement.children);
    const cutOff = isSubscribed ? topLevelElements.length : blogCutOff;

    setHtmlStrings(
      topLevelElements.slice(0, cutOff).map((element) => element.outerHTML)
    );
  }, [contentString, blogCutOff, isSubscribed]);

  return (
    <React.Fragment>
      {htmlStrings.map((htmlString, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: htmlString }}></div>
      ))}
      {!isSubscribed && (
        <p className="blur-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry...
        </p>
      )}
    </React.Fragment>
  );
};

export default HTMLContent;
