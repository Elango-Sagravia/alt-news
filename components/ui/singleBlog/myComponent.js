"use client";

import content from "@/content/content";
import { useAppContext } from "@/context/appContext";
import React from "react";
import SubscriberForm from "../subscriberForm/subscriberForm";

const HTMLContent = ({ contentString, blogCutOff }) => {
  const { isSubscribed } = useAppContext();

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
  const htmlStrings = topLevelElements.map((element) => element.outerHTML);

  console.log(htmlStrings);
  const cutOff = isSubscribed ? htmlStrings.length : blogCutOff;

  // console.log("styledContent :>> ", styledContent);

  return (
    <React.Fragment>
      {htmlStrings.splice(0, cutOff).map((htmlString, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: htmlString }}></div>
      ))}
      {!isSubscribed && (
        <p className="blur-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      )}
    </React.Fragment>
  );
};

export default HTMLContent;
