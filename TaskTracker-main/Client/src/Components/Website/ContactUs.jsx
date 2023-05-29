import React, { useEffect, useState } from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useRef();

  const [massage, setMassage] = useState({
    msg: '',
    theme: ''
  });

  const sendEmail = (event) => {
    event.preventDefault();

    const email = event.target.user_name.value;
    const user_email = event.target.user_email.value;
    const message = event.target.message.value;

    if (!email || !user_email || !message) {
      setMassage({ msg: 'Please fill in all fields!.', theme: 'red' });
      return;
    }

    emailjs
      .sendForm(
        "service_o4z25iw",
        "template_dhlo5h4",
        form.current,
        "IuZ5ilZIX-c2uVwa7"
      )
      .then(
        (result) => {
          setMassage({ msg: 'Your message has been sent successfully, our team will contact you as soon as possible.', theme: 'green' });
        },
        (error) => {
          setMassage({ msg: 'Something went wrong, please try again later!.', theme: 'red' });
          console.log("massage error :" + error)
        }
      );
      
    document.getElementById('form').reset();
  };

  return (
    <>
      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 text-gray-800 text-center">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n      .map-container {\n        height: 700px;\n        z-index: -1;\n      }\n    ",
            }}
          />
          <div className="px-6 py-12 md:px-12">
            <div className="container mx-auto xl:px-32">
              <div className="grid lg:grid-cols-2 items-center">
                <div className="md:mt-12 lg:mt-0 mb-12 lg:mb-0">
                  <div
                    className="block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
                    style={{
                      background: "hsla(0, 0%, 100%, 0.55)",
                      backdropFilter: "blur(30px)",
                    }}
                  >
                    <h2 className="text-3xl font-bold mb-12">Contact us</h2>
                    <form id="form" ref={form} onSubmit={sendEmail}>
                      <div className="form-group mb-6">
                        <input
                          type="text"
                          name="user_name"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleInput7"
                          placeholder="Name"
                        />
                      </div>
                      <div className="form-group mb-6">
                        <input
                          type="email"
                          name="user_email"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleInput8"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="form-group mb-6">
                        <textarea
                          name="message"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlTextarea13"
                          rows={3}
                          placeholder="Message"
                          defaultValue={""}
                        />
                      </div>
                      <button
                        type="submit"
                        value="send"
                        className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Send
                      </button>
                    </form>
                    <p className={`font-bold mt-3 text-${massage.theme}-500`}>{massage.msg}</p>
                  </div>
                </div>
                <a href="https://www.google.com/maps/place/Orange+Digital+Village+Zarqa/@32.0587246,36.0840747,18z/data=!4m6!3m5!1s0x151b65cd4d8f17e1:0x30e86b8a97e4ac7d!8m2!3d32.0587246!4d36.0851573!16s%2Fg%2F11s8wcmcb6">
                  <div className="md:mb-12 lg:mb-0">
                    <div className="map-container relative shadow-lg rounded-lg">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1690.69502762621!2d36.08475598108982!3d32.05869732178497!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65cd4d8f17e1%3A0x30e86b8a97e4ac7d!2sOrange%20Digital%20Village%20Zarqa!5e0!3m2!1sar!2sjo!4v1683882796604!5m2!1sar!2sjo" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                        className="left-0 top-0 h-full w-full absolute rounded-lg"
                        allowFullScreen=""
                      />
                      <iframe ></iframe>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
