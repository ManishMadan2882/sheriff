
export const CTA = () => {
  return (
    <div>
      <hr className="my-12 h-[1px] border-t-0 bg-white/10" />
      <div className="flex justify-center">
        <div className="my-14 mx-0 flex flex-wrap justify-center gap-16 lg:gap-3">
         
          <div className="max-w-[90%] flex-row sm:max-w-[415px]">
            <h1 className="font-outfit text-3xl font-semibold text-chinese-white">
              Instantly get your Codebase scanned
            </h1>
            <p className="mt-2 text-left font-outfit text-sm text-philippine-silver">
            In today's digital era, ensuring the security and integrity of your software supply chain is more critical than ever. Introducing Sheriif, the premier SaaS-based solution designed to safeguard every stage of your software development lifecycle.
            </p>
            {/* <div>
              <a
                href="https://app.docsgpt.cloud/"
                target="_blank"
                className="mt-12 inline-block w-40 rounded-md bg-gradient-to-r from-purple-X11 to-ultramarine-blue p-2 text-center font-outfit text-chinese-white"
                rel="noreferrer"
              >
                Start Now
              </a>
            </div> */}
          </div>
        </div>
      </div>
      <hr className="my-12 h-[1px] border-t-0 bg-white/10" />
    </div>
  );
};
