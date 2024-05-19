import React from 'react';

export const Card = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="metallic-gradient h-fit w-fit overflow-auto rounded-3xl p-1 text-left">
      <div className="grid h-72 w-60 grid-flow-row grid-rows-5 rounded-3xl bg-dark-gunmetal align-top sm:w-72">
        <h1 className="row-span-2 m-0 inline-block bg-gradient-to-b from-royal-blue to-deep-fuchsia bg-clip-text p-4 text-3xl text-transparent">
          {title}
        </h1>
        <p className="row-span-3 p-4 text-left font-outfit text-sm text-philippine-silver">
          {content}
        </p>
      </div>
    </div>
  );
};
