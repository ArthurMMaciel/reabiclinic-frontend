import React from "react";
import ronaldo from "../../img/Ronaldo Santos.png";

const people = [
  {
    name: "Ronaldo Santos",
    role: "Co-Founder / CEO",
    desc: "Doutor em Ciências Fisiológicas, UEL/PR. Especialista em Fisiologia do Exercício e Grupos Especiais",
    imageUrl: { ronaldo },
  },
  // More people...
];

export default function QuemSomos() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-pretty text-3xl font-raleway-semi-bold tracking-tight text-gray-900 sm:text-4xl">
            Quem somos?
          </h2>
          <p className="mt-6 text-lg/8 font-raleway text-gray-600">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  alt=""
                  src={person.imageUrl}
                  className="size-16 rounded-full"
                />
                <div>
                  <h2 className="text-base/5 font-raleway-semi-bold tracking-tight text-gray-900">
                    {person.name}
                  </h2>
                  <h3 className="text-sm/6 font-raleway-semi-bold text-indigo-600">
                    {person.role}
                  </h3>
                  <h5 className="font-raleway-semi-bold text-black-100">
                    {person.desc}
                  </h5>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
