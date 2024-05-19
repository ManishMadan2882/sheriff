import { Fragment } from 'react';
import { Card } from './Card';
const features: {
  title: string;
  content: string;
}[] =  [
  /* {
    title: "Comprehensive Security Coverage",
    content: "Sheriif provides an all-encompassing security framework that protects every stage of your software development lifecycle, from source code to production. We safeguard your software supply chain from vulnerabilities and unauthorized changes."
  },
  {
    title: "Real-time Threat Detection",
    content: "Our advanced monitoring system continuously scans for threats, identifying and mitigating risks in real-time. With Sheriif, you can rest assured that your software is protected against the latest threats and vulnerabilities."
  }, */
  {
    title: "Automated Compliance",
    content: "Stay compliant with industry standards and regulations effortlessly. Sheriif automates compliance checks and ensures that every code change adheres to your organization’s security policies and external regulatory requirements."
  },
  {
    title: "Insightful Analytics",
    content: "Gain deep insights into your software supply chain with our comprehensive analytics and reporting tools. Track vulnerabilities, monitor security trends, and make informed decisions to enhance your security posture."
  },
  {
    title: "Seamless Integration",
    content: "Sheriif integrates seamlessly with your existing tools and workflows. Whether you're using GitHub, GitLab, Bitbucket, or other CI/CD pipelines, our solution fits right in, providing robust security without disrupting your operations."
  },
  {
    title: "Source Code Analysis",
    content: "Detect and fix vulnerabilities in your codebase before they become threats. Sheriif's source code analysis ensures that your code is secure and free from potential security loopholes."
  },
  {
    title: "Dependency Scanning",
    content: "Identify and update insecure dependencies to prevent supply chain attacks. Sheriif's dependency scanning feature helps you manage dependencies effectively and ensure the integrity of your software supply chain."
  },
  {
    title: "Artifact Integrity",
    content: "Ensure the integrity and authenticity of your software artifacts from development to deployment."
  }]
export const Features = () => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute top-[100px] right-[450px] z-0 mx-auto hidden h-[500px] w-[500px] rounded-full bg-palatinate-blue blur-3xl sm:block">
        {/* blue glow (only for wide screens) */}
      </div>
      <div className=" pointer-events-none absolute top-[900px] right-1/3 z-0 mx-auto h-[268px] w-[268px] rounded-full bg-yellow-orange blur-3xl md:block lg:top-96 lg:left-[250px] lg:block lg:h-[500px] lg:w-[500px]">
        {/* yellow glow */}
      </div>
      <h1 className="px-4 text-left font-outfit text-3xl font-bold sm:text-center">
        Elevate your Security Standards
      </h1>
      <div className="my-10 justify-center flex">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {features?.map((feature, key) => (
            <Fragment key={key}>
              <Card title={feature.title} content={feature.content} />
            </Fragment>
          ))}
        </div>
      </div>



      <div className="my-10 flex justify-center">
        <a
          href="https://github.com/manishmadan2882/sheriff"
          target="_blank"
          className="rounded-md bg-gradient-to-r from-purple-X11 to-ultramarine-blue py-4 px-8 font-outfit"
          rel="noreferrer"
        >
          Learn more
        </a>
      </div>

      <hr className="my-12 h-[1px] border-t-0 bg-white/10" />
      <div>
        <div className="my-16 flex justify-center">
          <h1 className="max-w-[800px] px-4 text-left font-outfit text-3xl font-bold md:text-center">
            Enhance your team with automated Security tests
          </h1>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center font-outfit xl:flex-row">
          <div className="flex flex-col rounded-xl bg-dark-gunmetal p-6">
            <div className="m-2 rounded-full bg-gradient-to-b from-purple-X11 to-ultramarine-blue p-[1.5px]">
              <h1 className="m-0 rounded-full bg-charleston-green py-3 px-10 text-center text-lg font-bold text-chinese-white">
                Static Code Analysis
              </h1>
            </div>
            <div className="m-2 rounded-full bg-gradient-to-b from-purple-X11 to-ultramarine-blue p-[1.5px]">
              <h1 className="m-0 rounded-full bg-charleston-green py-3 px-6 text-center text-lg font-bold text-chinese-white">
                Dependency analysis
              </h1>
            </div>
            <div className="m-2 rounded-full bg-gradient-to-b from-purple-X11 to-ultramarine-blue p-[1.5px]">
              <h1 className="m-0 rounded-full bg-charleston-green py-3 px-6 text-center text-lg font-bold text-chinese-white">
                Real Time Imports
              </h1>
            </div>
          </div>

          <div className="m-4 h-14 w-0.5 bg-gradient-to-b from-purple-X11 to-ultramarine-blue lg:bg-gradient-to-r xl:h-0.5 xl:w-14">
            {/* LINE */}
          </div>
          <div className="flex justify-center rounded-full bg-dark-gunmetal font-outfit font-bold">
            <h1 className="m-0 inline-block bg-gradient-to-b from-aryldine-yellow to-cadmium-orange bg-clip-text py-5 px-10 text-center text-2xl text-transparent">
              Sheriff
            </h1>
          </div>

          <div className="m-4 h-14 w-0.5 bg-gradient-to-b from-purple-X11 to-ultramarine-blue lg:bg-gradient-to-r xl:h-0.5 xl:w-14">
            {/* LINE */}
          </div>

          <div className="flex flex-col rounded-xl bg-dark-gunmetal p-6 text-lg ">
            <h1 className="min-w-48 m-2 rounded-full border border-[#2EE6FFCC] bg-charleston-green py-3 px-10 text-center text-lg font-bold text-chinese-white">
              CI | CD
            </h1>
            <h1 className="min-w-48 m-2 rounded-full border border-[#2EE6FFCC] bg-charleston-green py-3 px-10 text-center text-lg font-bold text-chinese-white">
              Interactive dashboards
            </h1>
            <h1 className="min-w-48 m-2 rounded-full border border-[#2EE6FFCC] bg-charleston-green py-3 px-10 text-center text-lg font-bold text-chinese-white">
              Real-time monitoring
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
