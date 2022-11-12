import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaAws,
  FaCss3Alt,
  FaHtml5,
  FaNodeJs
} from "react-icons/fa";
import {
  GrGraphQl
} from "react-icons/gr";
import {
  RiReactjsLine
} from 'react-icons/ri';
import {
  SiAzuredevops,
  SiJavascript,
  SiJenkins,
  SiNextdotjs,
  SiPostgresql,
  SiTypescript
} from "react-icons/si";
import { Events, Link, scrollSpy } from "react-scroll";
import z from "zod";
import useMobileDetect from "../components/device/useMobileDetect";
import Footer from "../components/layout/Footer";

export function NavBar() {
  const { isMobile } = useMobileDetect();

  const getOffset = (): number => !isMobile() ? -80 : -60;
  useEffect(() => {
    scrollSpy.update();
  }, []);
  return ( <ul className="navbar-nav">
    <li><Link activeClass="active" href="#home" to="home" spy={true} smooth={true} duration={1500}
              offset={getOffset()}>Home</Link></li>
    <li><Link activeClass="active" href="#about" to="about" spy={true} smooth={true} duration={1500}
              offset={getOffset()}>About</Link></li>
    <li><Link activeClass="active" href="#specialities" to="specialities" spy={true} smooth={true} duration={1500}
              offset={getOffset()}>Services</Link></li>
    <li><Link activeClass="active" href="#contact" to="contact" spy={true} smooth={true} duration={1500}
              offset={getOffset()}>Contact Us</Link></li>
  </ul> );
}

interface MessageDetails {
  subject: string;
  fullname: string;
  email: string;
  message: string;
}

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  subject: z.string({
    required_error: "Please enter a subject"
  }).min(1, { message: "Please enter a subject." }),
  fullname: z.string().min(1, { message: "Please tell us your name." }),
  message: z.string().min(1, { message: "Please enter a message." })
});

const Home: NextPage = () => {
  const { isMobile } = useMobileDetect();
  const [, setMenuOpen] = useState(isMobile());
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MessageDetails>({
    mode: "all",
    defaultValues: {
      email: "",
      fullname: "",
      message: "",
      subject: ""
    },
    resolver: zodResolver(schema)
  });
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    Events.scrollEvent.register("start", function() {
      setMenuOpen(false);
    });
    Events.scrollEvent.register("end", function() {
      setMenuOpen(false);
    });
  }, []);

  const onSubmit = async (e: any) => {
    setSendError(false);
    setIsSending(true);
    setSendSuccess(false);

    const { email, fullname, subject, message } = e;
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: email,
        fullname: fullname,
        subject: subject,
        message: message
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    setIsSending(false);
    const { error } = await res.json();
    if (error) {
      setSendError(true);
      console.log(error);
      setIsSending(false);
      return;
    } else {
      setSendSuccess(true);
    }
  };

  return (
    <>
      <Head>
        <title>Home - Digital~Infamy</title>
        <meta name="description" content="Digital Infamy, solving problems using web based solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="sticky" style={{ zIndex: 1000 }}>
        <div className="nav-container p-8">
          <NavBar />
        </div>
      </nav>
      <main className="content">
        <section id="home" className="home container m-auto">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "rgb(0,212,255)",
              background: "linear-gradient(-90deg, rgba(0,212,255,1) 0%, rgba(0,255,221,1) 100%)",
              minWidth: "600px", minHeight: "600px"
            }}
          >
            <Image
              src="/Logo_plain_D_Black.svg"
              alt="Digital Infamy"
              width={150}
              height={150}
            />
            <h1>DIGITAL INFAMY</h1>
          </div>
        </section>
        <section id="about" className="about container m-auto p-8 text-center">
          <div className="text-center header-container">
            <h2 className="text-6xl">About</h2>
          </div>
          <p className="text-center p-4">
            Digital Infamy was founded by myself Andrew Allison. I&apos;m a web developer with over 15 years of
            experience working with software teams of varying sizes.
            The goal of Digital Infamy is to provide developer resourcing to teams who need it whilst not costing the
            earth and not talking total Jargon.
          </p>
          <p className="text-center p-4">
            As someone who has a passion for technology and thirst to learn I tend to be up-to-date with modern
            technologies. I have spent a lot of time over the years working with junior developers and helping them
            learn and grow. I also know there is a significant shortage in talented developers at the minute, I also get
            a thrill out of sharing knowledge and coaching others. So I joined all these Passions together and formed
            Digital Infamy
          </p>
          <p className="text-center p-4">
            The goal with Digital Infamy is for us to provide support to teams that either haven&apos;t have the time or
            the capabilities to learn, train and ultimately implement new technologies. We provide these services to
            companies who often can&apos;t afford expensive training courses or don&apos;t have the capacity to allow
            developers to be out of the business.
          </p>
        </section>
        <section id="specialities" className="specialities container m-auto p-8">
          <div className="header-container">
            <h2 className="text-center text-6xl">Specialities</h2>
          </div>
          <p className="text-center p-4">
            As a technologist who was worked across a wide range of technologies there are a lot of technical challenges
            businesses face that I could help with.
          </p>
          <div className="services-list">
            <div
              className="p-6 bg-white rounded-lg">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Developer for
                  Hire</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Need some additional resource but don&apos;t want to be tied down to 6-12 month contracts. I currently
                have the capacity to provide ad-hoc working hours to back fill on struggling projects</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                With a vast range of skills and an ability to fit in quickly with existing teams. I can often get up to
                speed and seamlessly and make it feel like I&apos;ve always been part of the team.
              </p>
            </div>
            <div
              className="p-6 bg-white rounded-lg">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mentoring
                  Services</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">I have an abundance of patients and have
                guided many developers on their careers. I can come in and help mentor junior developers and also more
                senior developers who need a hand picking up some of the modern tech-stack. This can be done in a very
                focus topic based way or via a work-based project to gain optimum value for money.</p>
            </div>
            <div
              className="p-6 bg-white rounded-lg">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Consultancy &
                  Advice</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                With over a decades experience of working with companies from Start-Ups to SME&apos;s and even a few
                medium sized corporations. I can offer advice and consultancy services on all aspects of development
                including Digital Transformations, Requirements Gathering, Process Mapping and Creation. Task
                Automation, Platform Selection and Agile Project Management. If you are looking for someone to come in
                and just be a second pair of eyes or give some independent advice I&apos;m more than capable of that.
                Use the Contact Form and we can have a Chat.</p>
            </div>
          </div>
          <h3 className="text-center text-4xl">Languages</h3>
          <h4 className="text-center text-2xl p-2">Some of the languages I work with</h4>
          <div className="coding-skills">
            <div className="text-center skill-item">
              <FaHtml5 className="text-8xl" />
              <h4>HTML</h4>
            </div>
            <div className="text-center skill-item">
              <FaCss3Alt className="text-8xl" />
              <h4>CSS</h4>
            </div>
            <div className="text-center skill-item">
              <SiTypescript className="text-8xl" />
              <h4>Typescript</h4>
            </div>
            <div className="text-center skill-item">
              <SiJavascript className="text-8xl" />
              <h4>Javascript</h4>
            </div>
          </div>
          <h3 className="text-center text-4xl">Frameworks</h3>
          <h4 className="text-center text-2xl p-2">Some of the frameworks I&apos;m familiar with.</h4>
          <div className="coding-skills">
            <div className="text-center skill-item">
              <RiReactjsLine className="text-8xl" />
              <h4>React</h4>
            </div>
            <div className="text-center skill-item">
              <FaNodeJs className="text-8xl" />
              <h4>NodeJs</h4>
            </div>
            <div className="text-center skill-item">
              <SiNextdotjs className="text-8xl" />
              <h4>NextJs</h4>
            </div>
            <div className="text-center skill-item">
              <GrGraphQl className="text-8xl" />
              <h4>GraphQL</h4>
            </div>
          </div>
          <h3 className="text-center text-4xl">Other Tech</h3>
          <h4 className="text-center text-2xl p-2">A few hip logos to give you even more idea about what kind of tech we
            work with.</h4>
          <div className="coding-skills">
            <div className="text-center skill-item">
              <SiAzuredevops className="text-8xl" />
              <h4>Azure</h4>
            </div>
            <div className="text-center skill-item">
              <FaAws className="text-8xl" />
              <h4>AWS</h4>
            </div>
            <div className="text-center skill-item">
              <SiJenkins className="text-8xl" />
              <h4>CI/CD DevOps</h4>
            </div>
            <div className="text-center skill-item">
              <SiPostgresql className="text-8xl" />
              <h4>PostgreSQL</h4>
            </div>
          </div>
          <p className="text-center">To find out more about the ways Digital Infamy could help please use the Contact Us
            form below.</p>
        </section>
        <section id="contact" className="contact container m-auto p-8">
          <div className="header-container">
            <h2 className="text-center text-6xl">Contact Us</h2>
          </div>
          <h4 className="text-center text-2xl p-2">Get in touch to find out how we can help.</h4>
          {sendError ?
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                 role="alert">
              <span className="font-medium">Send Mail error!</span> There was an error sending the email.
            </div> : null}
          {sendSuccess ? <>
            <div
              className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert">
              <span className="font-medium">Success!</span> The email was sent. Some one will be in touch soon.
            </div>
            <div className="flex flex-row items-center justify-center">
              {/*<pre>{JSON.stringify(errors, null, 2)}</pre>*/}
              <button
                onClick={() => {
                  setSendSuccess(false);
                  reset();
                }}
                type="submit"
                className="px-10 mt-8 py-2 bg-[#0f172e] text-gray-50 font-light rounded-md text-lg flex flex-row items-center">
                Click to Send Another
              </button>
            </div>
          </> : null}
          {!sendSuccess ?
            <form className="rounded-lg shadow-xl flex flex-col px-8 py-8" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-2xl">Send a message</h1>

              <label htmlFor="fullname" className="font-light mt-8">Full name<span
                className="text-red-500">*</span></label>
              <input
                type="text"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 font-light"
                {...register("fullname")}
              />
              {errors.fullname && (
                <div
                  className="mb-3 text-normal text-red-500 ">{errors?.fullname?.message ? `${errors?.fullname?.message}` : ""}</div>
              )}
              <label htmlFor="email" className="font-light mt-4">E-mail<span
                className="text-red-500">*</span></label>
              <input type="email"
                     className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 font-light"
                     {...register("email")}
              />
              {errors.email && (
                <div
                  className="mb-3 text-normal text-red-500 ">{errors?.email?.message ? `${errors?.email?.message}` : ""}</div>
              )}

              <label htmlFor="subject" className="font-light mt-4">Subject<span
                className="text-red-500">*</span></label>
              <input
                type="text"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 font-light"
                {...register("subject")}
              />
              {errors.subject && (
                <div
                  className="mb-3 text-normal text-red-500 ">{errors?.subject?.message ? `${errors?.subject?.message}` : ""}</div>
              )}

              <label htmlFor="message" className="font-light mt-4">Message<span
                className="text-red-500">*</span></label>
              <textarea
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 font-light text-gray-500"
                {...register("message")}
              ></textarea>
              {errors.message && (
                <div
                  className="mb-3 text-normal text-red-500 ">{errors?.message?.message ? `${errors?.message?.message}` : ""}</div>
              )}
              <div className="flex flex-row items-center justify-end">
                {/*<pre>{JSON.stringify(errors, null, 2)}</pre>*/}
                <button
                  disabled={isSending}
                  type="submit"
                  className="px-10 mt-8 py-2 bg-[#0f172e] text-gray-50 font-light rounded-md text-lg flex flex-row items-center">
                  Send
                </button>
              </div>
            </form> : null}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;