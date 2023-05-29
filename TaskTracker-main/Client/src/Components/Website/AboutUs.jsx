import { AiFillGithub } from "react-icons/ai";

const AboutUs = () => {
    
    const team = [
        {
            avatar: "https://avatars.githubusercontent.com/u/126164250?v=4",
            name: "Issam Addi",
            title: "Full stack developer",
            linkedin: "https://www.linkedin.com/in/issam-addi-09148a267/",
            Github: "https://github.com/Issam-Addi",
        },
    ]

    return (
            <>
                <div className="mb-20">
                    <section className="mb-32">
                        <div
                            className="relative overflow-hidden bg-no-repeat bg-cover"
                            style={{
                                backgroundPosition: "50%",
                                backgroundImage:
                                    'url("https://cdn.discordapp.com/attachments/1110119350838513677/1110418871535554560/top-view-children-s-desk-with-notebook-pen.jpg")',
                                height: 500
                            }} />
                        <div className="mx-auto px-6 md:px-12 xl:px-32">
                            <div className="text-center text-gray-800">
                                <div
                                    className="block rounded-lg shadow-lg px-6 py-12 md:py-16 md:px-12"
                                    style={{
                                        marginTop: "-170px",
                                        background: "hsla(0, 0%, 100%, 0.7)",
                                        backdropFilter: "blur(30px)"
                                    }}>
                                    <h1 className="text-4xl font-bold tracking-tight mb-12">
                                        To Do
                                    </h1>
                                    <p className="text-xl font-bold tracking-tight mb-12">
                                        to-do list-app shows a list of tasks that need to be completed in a Fully responsive website. It's a simple and effective way to organize and prioritize your tasks, helping you stay focused and productive.
                                        By creating a to-do list, you can better manage your time, track your progress, and ensure that important tasks are completed in a timely manner.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            <section className="py-14">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="max-w-xl">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Website Developer
                        </h3>
                    </div>
                    <div className="mt-12">
                        <ul className="w-full flex justify-center">
                            {
                                team.map((item, idx) => (
                                    <li key={idx} className="flex items-center justify-center">
                                        <div className="flex-none w-40 h-40">
                                            <img
                                                src={item.avatar}
                                                className="w-full h-full rounded-full"
                                                alt="" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-700 font-semibold sm:text-lg">{item.name}</h4>
                                            <p className="text-indigo-600">{item.title}</p>
                                            <div className="mt-3 flex gap-4 text-gray-400">
                                                <a href={item.Github}>
                                                    <AiFillGithub className="w-6 h-6 duration-150 hover:text-gray-500" />
                                                </a>
                                                <a href={item.linkedin}>
                                                    <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="none" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_68)"><path fill="currentColor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z" /></g><defs><clipPath id="clip0_17_68"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutUs;