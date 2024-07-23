import React from "react";

type MainHeaderProps = {
  Title: string;
  Subtitle: string;
};

const TitleTemplate = "Lorem ipsum dolor sit amet.";
const SubtitleTemplate =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

const ReusablesMainHeader = ({ Title, Subtitle }: MainHeaderProps) => {
  return (
    <header>
      <h1 className="text-5xl font-bold">{Title || TitleTemplate}</h1>
      <p className="text-xl">{Subtitle || SubtitleTemplate}</p>
    </header>
  );
};

export default ReusablesMainHeader;
